import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Checkout, Event } from 'stripe'

import { TransactionStatus } from '@/prisma/generated/enums'
import { PrismaService } from '@/src/core/prisma/prisma.service'

import { LivekitService } from '../libs/livekit/livekit.service'
import { StripeService } from '../libs/stripe/stripe.service'
import { TelegramService } from '../libs/telegram/telegram.service'
import { NotificationService } from '../notification/notification.service'

@Injectable()
export class WebhookService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly livekitService: LivekitService,
		private readonly notificationService: NotificationService,
		private readonly telegramService: TelegramService,
		private readonly stripeService: StripeService,
		private readonly configService: ConfigService
	) {}

	public async receiveWebhookLivekit(body: string, authorization: string) {
		const event = this.livekitService.receiver.receive(
			body,
			authorization,
			true
		)

		switch (event.event) {
			case 'ingress_started': {
				const ingressId = event.ingressInfo?.ingressId

				// LiveKit may deliver the same webhook more than once — only the
				// request that actually flips isLive sends notifications
				const { count } = await this.prismaService.stream.updateMany({
					where: {
						ingressId,
						isLive: false
					},
					data: {
						isLive: true
					}
				})

				if (count === 0) break

				const stream = await this.prismaService.stream.findUnique({
					where: {
						ingressId
					},
					include: {
						user: true
					}
				})

				const user = stream?.user

				if (!user) break

				const followers = await this.prismaService.follow.findMany({
					where: {
						followingId: user.id,
						follower: {
							isDeactivated: false
						}
					},
					include: {
						follower: {
							include: {
								notificationSettings: true
							}
						}
					}
				})

				for (const follow of followers) {
					const follower = follow.follower

					if (follower.notificationSettings?.siteNotifications) {
						await this.notificationService.createStreamStart(
							follower.id,
							user
						)
					}

					if (
						follower.notificationSettings?.telegramNotifications &&
						follower.telegramId
					) {
						await this.telegramService.sendStreamStart(
							follower.telegramId,
							user
						)
					}
				}
				break
			}
			case 'ingress_ended': {
				const stream = await this.prismaService.stream.update({
					where: {
						ingressId: event.ingressInfo?.ingressId
					},
					data: {
						isLive: false
					}
				})
				await this.prismaService.chatMessage.deleteMany({
					where: {
						streamId: stream.id
					}
				})
				break
			}
		}
	}

	public async receiveWebhookStripe(event: Event) {
		const session = event.data.object as Checkout.Session

		if (event.type == 'checkout.session.completed') {
			const { planId, userId, channelId } = session.metadata ?? {}

			if (!planId || !userId || !channelId) {
				throw new NotFoundException(
					'Checkout session metadata is incomplete'
				)
			}

			const expiresAt = new Date()

			expiresAt.setDate(expiresAt.getDate() + 30)

			const sponsorshipSubscription =
				await this.prismaService.sponsorshipSubscription.create({
					data: {
						expiresAt,
						sponsorshipPlanId: planId,
						channelId,
						userId
					},
					include: {
						sponsorshipPlan: true,
						user: true,
						channel: {
							include: {
								notificationSettings: true
							}
						}
					}
				})

			if (!sponsorshipSubscription.user) {
				throw new NotFoundException('User not found')
			}

			if (!sponsorshipSubscription.sponsorshipPlan) {
				throw new NotFoundException('Sponsorship plan not found')
			}

			await this.prismaService.transaction.updateMany({
				where: {
					stripeSubscriptionId: session.id,
					status: TransactionStatus.PENDING
				},
				data: {
					status: TransactionStatus.SUCCESS
				}
			})

			if (
				sponsorshipSubscription.channel?.notificationSettings
					?.siteNotifications
			) {
				await this.notificationService.createNewSponsorship(
					sponsorshipSubscription.channel.id,
					sponsorshipSubscription.sponsorshipPlan,
					sponsorshipSubscription.user
				)
			}

			if (
				sponsorshipSubscription.channel?.notificationSettings
					?.telegramNotifications &&
				sponsorshipSubscription.channel.telegramId
			) {
				await this.telegramService.sendNewSponsorship(
					sponsorshipSubscription.channel.telegramId,
					sponsorshipSubscription.sponsorshipPlan,
					sponsorshipSubscription.user
				)
			}
		}

		if (event.type === 'checkout.session.expired') {
			await this.prismaService.transaction.updateMany({
				where: {
					stripeSubscriptionId: session.id
				},
				data: {
					status: TransactionStatus.EXPIRED
				}
			})
		}

		if (event.type === 'checkout.session.async_payment_failed') {
			await this.prismaService.transaction.updateMany({
				where: {
					stripeSubscriptionId: session.id
				},
				data: {
					status: TransactionStatus.FAILED
				}
			})
		}
	}

	public constructStripeEvent(payload: any, signature: any): Event {
		return this.stripeService.webhooks.constructEvent(
			payload,
			signature,
			this.configService.getOrThrow<string>('STRIPE_WEBHOOK_SECRET')
		)
	}
}
