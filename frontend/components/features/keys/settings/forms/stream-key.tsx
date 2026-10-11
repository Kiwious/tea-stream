'use client'

import { Button } from '@/components/ui/common/button'
import { Input } from '@/components/ui/common/input'
import { CardContainer } from '@/components/ui/elements/card-container'
import { CopyButton } from '@/components/ui/elements/copy-button'
import { Eye, EyeOff } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

interface Props {
	value: string | null | undefined
}

export function StreamKey({ value }: Props) {
	const t = useTranslations('dashboard.keys.key')

	const [isShow, setIsShow] = useState(false)

	const Icon = isShow ? Eye : EyeOff

	return (
		<CardContainer
			isRightContentFull
			heading={t('heading')}
			rightContent={
				<div className='flex w-full items-center gap-x-4'>
					<Input
						name='url'
						value={value ?? ''}
						disabled
						placeholder={t('heading')}
						type={isShow ? 'text' : 'password'}
					/>
					<CopyButton value={value} />
					<Button
						variant='ghost'
						size='lgIcon'
						onClick={() => setIsShow(!isShow)}
					>
						<Icon className='size-5' />
					</Button>
				</div>
			}
		/>
	)
}
