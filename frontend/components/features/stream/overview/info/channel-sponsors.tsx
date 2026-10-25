'use client'

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/components/ui/common/card'
import { ChannelAvatar } from '@/components/ui/elements/channel-avatar'
import {
	useFindSponsorsByChannelQuery,
	type FindChannelByUsernameQuery
} from '@/graphql/generated/output'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function ChannelSponsors({ channel }: Props) {
	const t = useTranslations('stream.sponsors')

	const { data, loading: isLoadingSponsors } = useFindSponsorsByChannelQuery({
		variables: {
			channelId: channel.id
		}
	})
	const sponsors = data?.findSponsorsByChannel ?? []

	if (!sponsors.length || isLoadingSponsors) {
		return null
	}

	return (
		<Card className='mt-6'>
			<CardHeader className='p-4'>
				<CardTitle className='text-xl'>
					{t('heading')} {channel.displayName}
				</CardTitle>
			</CardHeader>
			<CardContent className='flex space-x-4 px-4'>
				{sponsors.map(sponsor => (
					<Link key={sponsor.user.id} href={`/${sponsor.user.username}`}>
						<ChannelAvatar channel={sponsor.user} size='lg' />
					</Link>
				))}
			</CardContent>
		</Card>
	)
}
