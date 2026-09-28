import {
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common'

import type { User } from '@/prisma/generated/browser'
import { PrismaService } from '@/src/core/prisma/prisma.service'

import { StripeService } from '../../libs/stripe/stripe.service'

import { CreatePlanInput } from './inputs/create-plan.input'

@Injectable()
export class PlanService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly stripeService: StripeService
	) {}

	public async findMyPlans(user: User) {
		const plans = await this.prismaService.sponsorshipPlan.findMany({
			where: {
				channelId: user.id
			}
		})

		return plans
	}

	public async createPlan(user: User, input: CreatePlanInput) {
		const { description, price, title } = input

		const channel = await this.prismaService.user.findUnique({
			where: {
				id: user.id
			}
		})

		if (!channel) {
			throw new NotFoundException('Channel not found')
		}

		if (!channel.isVerified) {
			throw new ForbiddenException(
				'To create plans, your channel must be verified'
			)
		}

		const stripePlan = await this.stripeService.plans.create({
			amount: Math.round(price * 100),
			currency: 'eur',
			interval: 'month',
			product: {
				name: title
			}
		})

		const stripeProductId =
			typeof stripePlan.product === 'string'
				? stripePlan.product
				: stripePlan.product?.id

		if (!stripeProductId) {
			throw new InternalServerErrorException(
				'Stripe did not return a product for the plan'
			)
		}

		await this.prismaService.sponsorshipPlan.create({
			data: {
				title,
				description,
				price,
				stripeProductId,
				stripePlanId: stripePlan.id,
				channel: {
					connect: {
						id: user.id
					}
				}
			}
		})

		return true
	}

	public async remove(planId: string) {
		const plan = await this.prismaService.sponsorshipPlan.findUnique({
			where: {
				id: planId
			}
		})

		if (!plan) {
			throw new NotFoundException('Plan not found')
		}

		await this.stripeService.plans.del(plan.stripePlanId)
		await this.stripeService.products.del(plan.stripeProductId)

		await this.prismaService.sponsorshipPlan.delete({
			where: {
				id: plan.id
			}
		})

		return true
	}
}
