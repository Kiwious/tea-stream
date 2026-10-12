import { CategoryList } from '@/components/features/category/list/category-list'
import {
	FindAllCategoriesDocument,
	type FindAllCategoriesQuery
} from '@/graphql/generated/output'
import { SERVER_URL } from '@/libs/constants/url.constants'
import { print } from 'graphql'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

async function findAllCategories() {
	const query = print(FindAllCategoriesDocument)

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
		throw new Error(errors?.[0]?.message ?? 'Failed to fetch categories')
	}

	return {
		categories:
			data.findAllCategories as FindAllCategoriesQuery['findAllCategories']
	}
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('categories')

	return {
		title: t('heading'),
		robots: {
			index: false,
			follow: false
		}
	}
}

export default async function CategoriesPage() {
	const { categories } = await findAllCategories()

	const t = await getTranslations('categories')

	return <CategoryList categories={categories} heading={t('heading')} />
}
