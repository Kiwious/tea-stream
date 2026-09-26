import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '@/src/core/prisma/prisma.service'

@Injectable()
export class ChannelService {
	constructor(private readonly prismaService: PrismaService) {}

	public async findRecommended() {
		const channels = await this.prismaService.user.findMany({
			where: {
				isDeactivated: false
			},
			orderBy: {
				followers: {
					_count: 'desc'
				}
			},
			include: {
				stream: true
			},
			take: 7
		})

		return channels
	}

	public async findByUsername(username: string) {
		const channel = await this.prismaService.user.findUnique({
			where: {
				username,
				isDeactivated: false
			},
			include: {
				socialLinks: {
					orderBy: {
						position: 'asc'
					}
				},
				stream: {
					include: {
						category: true
					}
				},
				followers: true
			}
		})

		if (!channel) {
			throw new NotFoundException('Channel not found')
		}

		return channel
	}

	public async findFollowersCountByChannel(channelId: string) {
		const followers = await this.prismaService.follow.count({
			where: {
				following: {
					id: channelId
				}
			}
		})

		return followers
	}
}
