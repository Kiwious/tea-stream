'use client'

import { Card } from '@/components/ui/common/card'
import { FindChannelByUsernameQuery } from '@/graphql/generated/output'
import { getMediaSource } from '@/utils/get-media-source'
import { WifiOff } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { CSSProperties } from 'react'

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function OfflineStream({ channel }: Props) {
	const t = useTranslations('stream.video')

	const backgroundStyle: CSSProperties = channel.stream.thumbnailUrl
		? {
				backgroundImage: `url(${getMediaSource(channel.stream.thumbnailUrl)})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}
		: {}

	return (
		<Card
			className='flex h-full flex-col items-center justify-center'
			style={backgroundStyle}
		>
			{channel.stream.thumbnailUrl && (
				<div className='absolute inset-0 z-0 rounded-lg bg-black opacity-60' />
			)}
			<WifiOff className='text-muted-foreground z-10 size-12' />
			<p className='z-10 mt-3 text-lg text-white'>
				{channel.displayName} {t('offline')}
			</p>
		</Card>
	)
}
