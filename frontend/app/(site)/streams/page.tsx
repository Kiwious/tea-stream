import { CategoryOverview } from '@/components/features/category/overview/category-overview'
import { StreamsContent } from '@/components/features/stream/list/streams-content'
import {
	FindAllStreamsDocument,
	type FindAllStreamsQuery
} from '@/graphql/generated/output'
import { SERVER_URL } from '@/libs/constants/url.constants'
import { getMediaSource } from '@/utils/get-media-source'
import { print } from 'graphql'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

async function findAllStreams() {
	try {
		const query = print(FindAllStreamsDocument)
		const variables = {
			filters: {}
		}

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
			throw new Error(errors?.[0]?.message ?? 'Failed to fetch streams')
		}

		return {
			streams:
				data.findAllStreams as FindAllStreamsQuery['findAllStreams']
		}
	} catch (error) {
		console.log(error)
		throw new Error(error as string)
	}
}

export async function generateMetadata({
	searchParams
}: {
	searchParams: Promise<{ searchTerm: string }>
}): Promise<Metadata> {
	const t = await getTranslations('streams')
	const params = await searchParams

	return {
		title: params.searchTerm
			? `${t('searchHeading')} "${params.searchTerm}"`
			: t('heading')
	}
}

export default async function StreamsPage() {
	const { streams } = await findAllStreams()
	return <StreamsContent streams={streams} />
}
