'use client'

import type { FindChannelByUsernameQuery } from '@/graphql/generated/output'
import { useStreamToken } from '@/hooks/useStreamToken'
import { LiveKitRoom } from '@livekit/components-react'
import { StreamVideo, StreamVideoSkeleton } from './player/stream-video'
import { StreamInfo, StreamInfoSkeleton } from './info/stream-info'
import { AboutChannel, AboutChannelSkeleton } from './info/about-channel'
import { ChannelSponsors } from './info/channel-sponsors'
import { LiveChat, LiveChatSkeleton } from '../../chat/live/live-chat'

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function StreamOverview({ channel }: Props) {
	const { token, identity, name } = useStreamToken(channel.id)

	if (!token || !name || !identity) {
		return <StreamOverviewSkeleton />
	}

	return (
		<LiveKitRoom
			token={token}
			serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
			className='grid grid-cols-1 gap-6 lg:grid-cols-7'
		>
			<div className='order-1 col-span-1 flex flex-col lg:col-span-5'>
				<StreamVideo channel={channel} />
				<StreamInfo channel={channel} />
				<AboutChannel channel={channel} />
				<ChannelSponsors channel={channel} />
			</div>
			<div className='order-2 col-span-1 flex h-80 flex-col space-y-6 lg:col-span-2'>
				<LiveChat
					channel={channel}
					isChatEnabled={channel.stream.isChatEnabled}
					isChatFollowersOnly={channel.stream.isChatFollowersOnly}
					isChatPremiumFollowersOnly={
						channel.stream.isChatPremiumFollowersOnly
					}
				/>
			</div>
		</LiveKitRoom>
	)
}

export function StreamOverviewSkeleton() {
	return (
		<div className='grid grid-cols-1 gap-6 lg:grid-cols-7'>
			<div className='order-1 col-span-1 flex flex-col lg:col-span-5'>
				<StreamVideoSkeleton />
				<StreamInfoSkeleton />
				<AboutChannelSkeleton />
			</div>
			<div className='order-2 col-span-1 flex h-80 flex-col space-y-6 lg:col-span-2'>
				<LiveChatSkeleton />
			</div>
		</div>
	)
}
