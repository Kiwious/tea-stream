'use client'

import { Card } from '@/components/ui/common/card'
import { ChannelAvatar } from '@/components/ui/elements/channel-avatar'
import { LiveBadge } from '@/components/ui/elements/live-badge'
import type { FindProfileQuery } from '@/graphql/generated/output'
import { getRandomColor } from '@/utils/color'
import { getMediaSource } from '@/utils/get-media-source'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
	url: string | null | undefined
	user: Partial<
		Pick<
			FindProfileQuery['findProfile'],
			'username' | 'avatar' | 'isVerified'
		>
	>
	isLive?: boolean
}

export function StreamThumbnail({ url, user, isLive }: Props) {
	const [randomColor, setRandomColor] = useState('')

	function handleMouseEnter() {
		if (!randomColor) setRandomColor(getRandomColor())
	}

	return (
		<div
			className='group relative aspect-video cursor-pointer rounded-lg'
			onMouseEnter={handleMouseEnter}
		>
			<div
				className='absolute inset-0 flex items-center justify-center rounded-lg opacity-0 transition-opacity group-hover:opacity-100'
				style={{
					backgroundColor: randomColor
				}}
			/>
			{url ? (
				<Image
					src={getMediaSource(url) ?? ''}
					alt={user.username ?? ''}
					fill
					className='rounded-xl object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2'
				/>
			) : (
				<Card className='flex h-full w-full flex-col items-center gap-y-4 rounded-xl transition-transform group-hover:translate-x-2 group-hover:-translate-y-2'>
					<ChannelAvatar channel={user} isLive={isLive} />
				</Card>
			)}
			{isLive && (
				<div className='absolute top-2 right-2 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2'>
					<LiveBadge />
				</div>
			)}
		</div>
	)
}
