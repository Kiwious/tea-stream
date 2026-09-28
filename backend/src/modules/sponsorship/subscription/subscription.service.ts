import { Injectable } from '@nestjs/common'

import type { User } from '@/prisma/generated/browser'
import { PrismaService } from '@/src/core/prisma/prisma.service'

@Injectable()
export class SubscriptionService {
	constructor(private readonly prismaService: PrismaService) {}

	public async findMySponsors(user: User) {
		const sponsors =
			await this.prismaService.sponsorshipSubscription.findMany({
				where: {
					channelId: user.id
				},
				orderBy: {
					createdAt: 'desc'
				},
				include: {
					sponsorshipPlan: true,
					user: true,
					channel: true
				}
			})

		return sponsors
	}
}
