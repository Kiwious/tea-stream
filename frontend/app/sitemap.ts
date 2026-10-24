import {
	FindAllCategoriesDocument,
	type FindAllCategoriesQuery
} from '@/graphql/generated/output'
import { APP_URL, SERVER_URL } from '@/libs/constants/url.constants'
import { print } from 'graphql'
import type { MetadataRoute } from 'next'

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const { categories } = await findAllCategories()
	const routes: MetadataRoute.Sitemap = [
		{
			url: APP_URL,
			lastModified: new Date().toISOString(),
			priority: 1.0
		},
		{
			url: APP_URL + '/streams',
			lastModified: new Date().toISOString(),
			priority: 0.9
		},
		{
			url: APP_URL + '/categories',
			lastModified: new Date().toISOString(),
			priority: 0.8
		}
	]

	categories.forEach(category => {
		routes.push({
			url: APP_URL + `/categories/${category.slug}`,
			lastModified: new Date(category.updatedAt as string).toISOString(),
			priority: 0.7
		})
	})

	return routes
}
