import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '@/src/core/prisma/prisma.service'

@Injectable()
export class CategoryService {
	constructor(private readonly prismaService: PrismaService) {}

	public async findAll() {
		const categories = await this.prismaService.category.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				streams: {
					include: {
						user: true,
						category: true
					}
				}
			}
		})
		return categories
	}

	public async findRandom() {
		const total = await this.prismaService.category.count()

		const randomIndexes = new Set<number>()
		const RANDOM_CATEGORIES_COUNT = 7

		while (randomIndexes.size < RANDOM_CATEGORIES_COUNT) {
			const randomIndex = Math.floor(Math.random() * total)
			randomIndexes.add(randomIndex)
		}

		const categories = await this.prismaService.category.findMany({
			skip: 0,
			take: total,
			include: {
				streams: {
					include: {
						user: true,
						category: true
					}
				}
			}
		})

		return Array.from(randomIndexes).map(idx => categories[idx])
	}

	public async findBySlug(slug: string) {
		const category = await this.prismaService.category.findUnique({
			where: { slug },
			include: {
				streams: {
					include: {
						user: true,
						category: true
					}
				}
			}
		})

		if (!category) {
			throw new NotFoundException('Category not found')
		}

		return category
	}
}
