'use client'

import { Heading } from '@/components/ui/elements/heading'
import { FindCategoryBySlugQuery } from '@/graphql/generated/output'
import { getMediaSource } from '@/utils/get-media-source'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { StreamsList } from '../../stream/list/streams-list'

interface Props {
	category: FindCategoryBySlugQuery['findCategoryBySlug']
}

export function CategoryOverview({ category }: Props) {
	const t = useTranslations('categories.overview')

	return (
		<div className='space-y-8'>
			<div className='gap-x-6 lg:flex lg:items-center lg:space-y-6'>
				<Image
					src={getMediaSource(category.thumbnailUrl) ?? ''}
					alt={category.title}
					width={192}
					height={256}
					className='aspect-3/4 rounded-xl object-cover'
				/>
				<Heading
					title={category.title}
					description={category.description ?? ''}
					size='xl'
				/>
			</div>
			<StreamsList heading={t('heading')} streams={category.streams} />
		</div>
	)
}
