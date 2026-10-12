'use client'

import type { FindRandomCategoriesQuery } from '@/graphql/generated/output'
import { getRandomColor } from '@/utils/color'
import { getMediaSource } from '@/utils/get-media-source'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Props {
	category: FindRandomCategoriesQuery['findRandomCategories'][0]
}

export function CategoryCard({ category }: Props) {
	const [randomColor, setRandomColor] = useState('')

	function handleMouseEnter() {
		if (!randomColor) setRandomColor(getRandomColor())
	}

	return (
		<Link
			href={`/categories/${category.slug}`}
			className='h-full w-full space-y-4'
			onMouseEnter={handleMouseEnter}
		>
			<div className='group relative aspect-3/4 cursor-pointer rounded-xl'>
				<div
					className='absolute inset-0 flex items-center justify-center rounded-xl opacity-0 transition-opacity group-hover:opacity-100'
					style={{
						backgroundColor: randomColor
					}}
				/>
				<Image
					src={getMediaSource(category.thumbnailUrl) ?? ''}
					alt={category.title}
					fill
					className='rounded-lg object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2'
				/>
			</div>
			<div>
				<h2 className='text-foreground hover:text-primary truncate text-base font-semibold'>
					{category.title}
				</h2>
			</div>
		</Link>
	)
}
