'use client'

import { Button } from '@/components/ui/common/button'
import { Slider } from '@/components/ui/common/slider'
import { Hint } from '@/components/ui/elements/hint'
import { Volume1, Volume2, VolumeX } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Props {
	onToggle: () => void
	onChange: (value: number) => void
	value: number
}

export function VolumeControl({ onChange, onToggle, value }: Props) {
	const t = useTranslations('stream.video.player')

	const isMuted = value === 0
	const isAboveHalf = value > 50

	let Icon = Volume1

	if (isMuted) {
		Icon = VolumeX
	} else if (isAboveHalf) {
		Icon = Volume2
	}

	function handleChange(value: number | readonly number[]) {
		onChange(Array.isArray(value) ? value[0] : value)
	}

	return (
		<div className='flex items-center gap-2'>
			<Hint label={t('volume')}>
				<Button
					variant='ghost'
					size='lgIcon'
					onClick={onToggle}
					className='text-white hover:bg-white/10'
				>
					<Icon className='size-6' />
				</Button>
			</Hint>
			<div className='w-32'>
				<Slider
					className='cursor-pointer'
					onValueChange={handleChange}
					value={[value]}
					max={100}
					step={1}
				/>
			</div>
		</div>
	)
}
