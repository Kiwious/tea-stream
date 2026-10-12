import { CategoryOverview } from '@/components/features/category/overview/category-overview'
import { StreamOverview } from '@/components/features/stream/overview/stream-overview'
import {
	FindChannelByUsernameDocument,
	type FindChannelByUsernameQuery
} from '@/graphql/generated/output'
import { SERVER_URL } from '@/libs/constants/url.constants'
import { getMediaSource } from '@/utils/get-media-source'
import { print } from 'graphql'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

async function findChannelByUsername({ username }: { username: string }) {
	try {
		const query = print(FindChannelByUsernameDocument)
		const variables = { username }

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
			throw new Error(errors?.[0]?.message ?? 'Failed to fetch user')
		}

		return {
			channel:
				data.findChannelByUsername as FindChannelByUsernameQuery['findChannelByUsername']
		}
	} catch (error) {
		return notFound()
	}
}

export async function generateMetadata({
	params
}: {
	params: Promise<{ username: string }>
}): Promise<Metadata> {
	const { username } = await params

	const { channel } = await findChannelByUsername({ username })
	return {
		title: channel.displayName,
		description: channel.bio ?? channel.displayName,
		openGraph: {
			images: [
				{
					url: getMediaSource(channel.avatar) ?? '',
					alt: channel.displayName
				}
			]
		}
	}
}

export default async function ChannelPage({
	params
}: {
	params: Promise<{ username: string }>
}) {
	const { username } = await params

	const { channel } = await findChannelByUsername({ username })
	return <StreamOverview channel={channel} />
}
