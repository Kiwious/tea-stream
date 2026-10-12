import { CategoryOverview } from '@/components/features/category/overview/category-overview'
import {
	FindCategoryBySlugDocument,
	type FindCategoryBySlugQuery
} from '@/graphql/generated/output'
import { SERVER_URL } from '@/libs/constants/url.constants'
import { getMediaSource } from '@/utils/get-media-source'
import { print } from 'graphql'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

async function findCategoryBySlug({ slug }: { slug: string }) {
	try {
		const query = print(FindCategoryBySlugDocument)
		const variables = { slug }

		const response = await fetch(SERVER_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query, variables }),
			next: {
				revalidate: 30
			}
		})

		const { data, errors } = await response.json()

		if (errors?.length || !data) {
			throw new Error(
				errors?.[0]?.message ?? 'Failed to fetch categories'
			)
		}

		return {
			category:
				data.findCategoryBySlug as FindCategoryBySlugQuery['findCategoryBySlug']
		}
	} catch (error) {
		return notFound()
	}
}

export async function generateMetadata({
	params
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params

	const { category } = await findCategoryBySlug({ slug })
	return {
		title: category.title,
		description: category.description,
		openGraph: {
			images: [
				{
					url: getMediaSource(category.thumbnailUrl) ?? '',
					alt: category.title
				}
			]
		}
	}
}

export default async function CategoryPage({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params

	const { category } = await findCategoryBySlug({ slug })
	return <CategoryOverview category={category} />
}
