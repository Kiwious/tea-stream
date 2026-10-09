'use client'

import { Separator } from '@/components/ui/common/separator'
import { useFindRecommendedChannelsQuery } from '@/graphql/generated/output'
import { useSidebar } from '@/hooks/useSidebar'
import { useTranslations } from 'next-intl'
import { ChannelItem } from './channel-item'

export function RecommendedChannels() {
	const t = useTranslations('layout.sidebar.recommended')

	const { isCollapsed } = useSidebar()

	const { data, loading: isLoadingRecommended } =
		useFindRecommendedChannelsQuery()
	const channels = data?.findRecommendedChannels ?? []

	return (
		<div>
			<Separator className='mb-3' />
			{!isCollapsed && (
				<h2 className='text-foreground mb-2 px-2 text-lg font-semibold'>
					{t('heading')}
				</h2>
			)}
			{isLoadingRecommended ? (
				<div>Loading...</div>
			) : (
				channels.map((channel, index) => (
					<ChannelItem
						key={`${channel.username}-${index}`}
						channel={channel}
					/>
				))
			)}
		</div>
	)
}
