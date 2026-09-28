import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import type { User } from '@/prisma/generated/browser'
import { PrismaService } from '@/src/core/prisma/prisma.service'

import { StripeService } from '../../libs/stripe/stripe.service'

@Injectable()
export class TransactionService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService,
		private readonly stripeService: StripeService
	) {}

	public async findMyTransactions(user: User) {
		const transactions = await this.prismaService.transaction.findMany({
			where: {
				userId: user.id
			}
		})

		return transactions
	}

	public async makePayment(user: User, planId: string) {
		const plan = await this.prismaService.sponsorshipPlan.findUnique({
			where: {
				id: planId
			},
			include: {
				channel: true
			}
		})

		if (!plan) {
			throw new NotFoundException('Plan not found')
		}

		if (user.id === plan.channelId) {
			throw new ConflictException(
				"Can't sign up sponsorship on your self"
			)
		}

		const existingSubscription =
			await this.prismaService.sponsorshipSubscription.findFirst({
				where: {
					userId: user.id,
					channelId: plan.channelId
				}
			})

		if (existingSubscription) {
			throw new ConflictException(
				'You already signed up for this subscription'
			)
		}

		const customer = await this.stripeService.customers.create({
			name: user.username,
			email: user.email
		})

		const session = await this.stripeService.checkout.sessions.create({
			payment_method_types: ['card', 'paypal'],
			line_items: [
				{
					price_data: {
						currency: 'eur',
						product_data: {
							name: plan.title,
							description: plan.description ?? ' '
						},
						unit_amount: Math.round(plan.price * 100),
						recurring: {
							interval: 'month'
						}
					},
					quantity: 1
				}
			],
			mode: 'subscription',
			success_url: `${this.configService.getOrThrow<string>('ALLOWED_ORIGIN')}/success?price=${plan.price}&username=${plan.channel?.username}`,
			cancel_url: this.configService.getOrThrow<string>('ALLOWED_ORIGIN'),
			customer: customer.id,
			metadata: {
				planId: plan.id,
				userId: user.id,
				channelId: plan.channel?.id ?? ''
			}
		})

		await this.prismaService.transaction.create({
			data: {
				amount: plan.price,
				currency: session.currency ?? 'eur',
				stripeSubscriptionId: session.id,
				user: {
					connect: {
						id: user.id
					}
				}
			}
		})

		return { url: session.url }
	}
}
