import { print } from 'graphql'

import {
	FindRandomCategoriesDocument,
	type FindRandomCategoriesQuery,
	FindRandomStreamsDocument,
	type FindRandomStreamsQuery
} from '@/graphql/generated/output'
import { SERVER_URL } from '@/libs/constants/url.constants'
import { getTranslations } from 'next-intl/server'
import { StreamsList } from '@/components/features/stream/list/streams-list'
import { CategoryList } from '@/components/features/category/list/category-list'

async function findRandomStreams() {
	const query = print(FindRandomStreamsDocument)

	const response = await fetch(SERVER_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ query }),
		next: {
			revalidate: 30
		}
	})

	const { data, errors } = await response.json()

	if (errors?.length || !data) {
		throw new Error(
			errors?.[0]?.message ?? 'Failed to fetch random streams'
		)
	}

	return {
		streams:
			data.findRandomStreams as FindRandomStreamsQuery['findRandomStreams']
	}
}

async function findRandomCategories() {
	const query = print(FindRandomCategoriesDocument)

	const response = await fetch(SERVER_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ query }),
		next: {
			revalidate: 30
		}
	})

	const { data, errors } = await response.json()

	if (errors?.length || !data) {
		throw new Error(
			errors?.[0]?.message ?? 'Failed to fetch random categories'
		)
	}

	return {
		categories:
			data.findRandomCategories as FindRandomCategoriesQuery['findRandomCategories']
	}
}

export default async function HomePage() {
	const t = await getTranslations('home')

	const { streams } = await findRandomStreams()
	const { categories } = await findRandomCategories()

	return (
		<div className='space-y-10'>
			<StreamsList streams={streams} heading={t('streamsHeading')} />
			<CategoryList
				categories={categories}
				heading={t('categoriesHeading')}
			/>
		</div>
	)
}
