'use client'

import { Button } from '@/components/ui/common/button'
import { Hint } from '@/components/ui/elements/hint'
import { Maximize, Minimize } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Props {
	isFullscreen: boolean
	onToggle: () => void
}

export function FullscreenControl({ isFullscreen, onToggle }: Props) {
	const t = useTranslations('stream.video.player.fullscreen')

	const Icon = isFullscreen ? Minimize : Maximize

	return (
		<div className='flex items-center justify-center gap-4'>
			<Hint label={isFullscreen ? t('exit') : t('open')}>
				<Button
					variant='ghost'
					size='lgIcon'
					onClick={onToggle}
					className='text-white hover:bg-white/10'
				>
					<Icon className='size-6' />
				</Button>
			</Hint>
		</div>
	)
}
