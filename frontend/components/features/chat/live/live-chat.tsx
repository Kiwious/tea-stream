'use client'

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/components/ui/common/card'
import { Skeleton } from '@/components/ui/common/skeleton'
import {
	useFindMyFollowingsQuery,
	useFindSponsorsByChannelQuery,
	type FindChannelByUsernameQuery
} from '@/graphql/generated/output'
import { useAuth } from '@/hooks/useAuth'
import {
	useConnectionState,
	useRemoteParticipant
} from '@livekit/components-react'
import { ConnectionState } from 'livekit-client'
import { MessageSquareOff } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { LoadingChat } from './loading-chat'
import { SendMessageForm } from './send-message-form'
import { MessagesList } from './messages-list'
import { ChatInfo } from './chat-info'
import { useCurrent } from '@/hooks/useCurrent'

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
	isChatEnabled: boolean
	isChatFollowersOnly: boolean
	isChatPremiumFollowersOnly: boolean
}

export function LiveChat({
	channel,
	isChatEnabled,
	isChatFollowersOnly,
	isChatPremiumFollowersOnly
}: Props) {
	const t = useTranslations('stream.chat')

	const { isAuthenticated } = useAuth()
	const { user, isLoadingProfile } = useCurrent()

	const { data: followingsData, loading: isLoadingFollowings } =
		useFindMyFollowingsQuery({
			skip: !isAuthenticated
		})
	const followings = followingsData?.findMyFollowings ?? []

	const { data: sponsorsData, loading: isLoadingSponsors } =
		useFindSponsorsByChannelQuery({
			variables: {
				channelId: channel.id
			}
		})
	const sponsors = sponsorsData?.findSponsorsByChannel ?? []

	const isOwnerChannel = user?.id === channel.id
	const isFollower = followings.some(
		following => following.followingId === channel.id
	)
	const isSponsor = sponsors.some(sponsor => sponsor.user.id === user?.id)

	const connectionState = useConnectionState()
	const participant = useRemoteParticipant(channel.id)

	const isOnline =
		participant && connectionState === ConnectionState.Connected

	const isDisabled =
		!isOnline ||
		!isAuthenticated ||
		!isChatEnabled ||
		isLoadingProfile ||
		(isChatFollowersOnly && !isFollower && !isOwnerChannel) ||
		(isChatPremiumFollowersOnly && !isSponsor && !isOwnerChannel)

	if (
		connectionState === ConnectionState.Connecting ||
		isLoadingProfile ||
		isLoadingFollowings ||
		isLoadingSponsors
	) {
		return <LoadingChat />
	}

	return (
		<Card className='flex h-[82%] w-full flex-col overflow-y-auto lg:fixed lg:w-[21.5%] xl:mt-0'>
			<CardHeader className='border-b py-2'>
				<CardTitle className='text-center text-lg'>
					{t('heading')}
				</CardTitle>
			</CardHeader>
			<CardContent className='flex h-full flex-col overflow-y-auto p-4'>
				{isOnline ? (
					<>
						<MessagesList channel={channel} />
						<ChatInfo
							isChatEnabled={isChatEnabled}
							isChatFollowersOnly={isChatFollowersOnly}
							isChatPremiumFollowersOnly={
								isChatPremiumFollowersOnly
							}
							isFollower={isFollower}
							isOwnerChannel={isOwnerChannel}
							isSponsor={isSponsor}
						/>
						<SendMessageForm
							channel={channel}
							isDisabled={isDisabled}
						/>
					</>
				) : (
					<div className='flex h-full flex-col items-center justify-center'>
						<MessageSquareOff className='text-muted-foreground size-10' />
						<h2 className='mt-3 text-xl font-medium'>
							{t('unavailable')}
						</h2>
						<p className='text-muted-foreground mt-1 w-full text-center'>
							{t('unavailableMessage')}
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export function LiveChatSkeleton() {
	return (
		<Skeleton className='fixed my-8 flex h-[82%] w-[21.5%] flex-col xl:mt-0' />
	)
}
