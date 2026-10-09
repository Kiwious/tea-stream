'use client'

import { Button } from '@/components/ui/common/button'
import { ChannelAvatar } from '@/components/ui/elements/channel-avatar'
import { ChannelVerified } from '@/components/ui/elements/channel-verified'
import { Hint } from '@/components/ui/elements/hint'
import { LiveBadge } from '@/components/ui/elements/live-badge'
import { FindRecommendedChannelsQuery } from '@/graphql/generated/output'
import { useSidebar } from '@/hooks/useSidebar'
import { cn } from 'cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
	channel: FindRecommendedChannelsQuery['findRecommendedChannels'][0]
}

export function ChannelItem({ channel }: Props) {
	const pathname = usePathname()
	const { isCollapsed } = useSidebar()

	const isActive = pathname === `/${channel.username}`

	return isCollapsed ? (
		<Hint label={channel.username} side='right'>
			<Link
				href={`/${channel.username}`}
				className='mt-3 flex w-full items-center justify-center'
			>
				<ChannelAvatar
					channel={channel}
					isLive={channel.stream.isLive}
				/>
			</Link>
		</Hint>
	) : (
		<Button
			className={cn(
				'mt-2 h-11 w-full justify-start gap-x-4',
				isActive && 'bg-accent'
			)}
			variant='ghost'
			nativeButton={false}
			render={
				<Link
					href={`/${channel.username}`}
					className='flex w-full items-center'
				/>
			}
		>
			<ChannelAvatar
				size='sm'
				channel={channel}
				isLive={channel.stream.isLive}
			/>
			<h2 className='truncate pl-3'>{channel.username}</h2>
			{channel.isVerified && <ChannelVerified size='sm' />}
			{channel.stream.isLive && (
				<div className='ml-auto shrink-0'>
					<LiveBadge />
				</div>
			)}
		</Button>
	)
}
