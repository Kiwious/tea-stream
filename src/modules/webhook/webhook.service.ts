import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/src/core/prisma/prisma.service'

import { LivekitService } from '../libs/livekit/livekit.service'
import { NotificationService } from '../notification/notification.service'

@Injectable()
export class WebhookService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly livekitService: LivekitService,
		private readonly notificationService: NotificationService
	) {}

	public async receiveWebhookLivekit(body: string, authorization: string) {
		const event = this.livekitService.receiver.receive(
			body,
			authorization,
			true
		)

		switch (event.event) {
			case 'ingress_started': {
				const stream = await this.prismaService.stream.update({
					where: {
						ingressId: event.ingressInfo?.ingressId
					},
					data: {
						isLive: true
					},
					include: {
						user: true
					}
				})

				const user = stream.user

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
}
