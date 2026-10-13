'use client'

import { ChannelAvatar } from '@/components/ui/elements/channel-avatar'
import { ChannelVerified } from '@/components/ui/elements/channel-verified'
import type { FindChannelByUsernameQuery } from '@/graphql/generated/output'
import { useParticipants } from '@livekit/components-react'
import { User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { StreamActions } from './stream-actions'

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function StreamInfo({ channel }: Props) {
	const t = useTranslations('stream.info')

	const participants = useParticipants()

	const participantCount = participants.length - 1

	return (
		<div className='space-y-5'>
			<h1 className='text-xl font-semibold'>
				{channel.stream.title}{' '}
				{channel.stream.category &&
					` | ${channel.stream.category.title}`}
			</h1>
			<div className='flex flex-col items-start justify-between lg:flex-row'>
				<div className='flex items-center gap-x-3 px-1'>
					<ChannelAvatar
						channel={channel}
						isLive={channel.stream.isLive}
						size='lg'
					/>
					<div className='space-y-1'>
						<h2 className='flex items-center gap-x-2 text-lg font-semibold'>
							{channel.displayName}
							{channel.isVerified && <ChannelVerified />}
						</h2>
						{channel.stream.isLive ? (
							<div className='flex items-center gap-x-1 text-xs font-semibold text-rose-500'>
								<User className='size-4' />
								{participantCount} {t('viewers')}
							</div>
						) : (
							<p className='text-muted-foreground text-xs font-semibold'>
								{t('offline')}
							</p>
						)}
					</div>
				</div>
				<StreamActions channel={channel} />
			</div>
		</div>
	)
}
