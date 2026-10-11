'use client'

import { Input } from '@/components/ui/common/input'
import { CardContainer } from '@/components/ui/elements/card-container'
import { CopyButton } from '@/components/ui/elements/copy-button'
import { useTranslations } from 'next-intl'

interface Props {
	value: string | null | undefined
}

export function StreamUrl({ value }: Props) {
	const t = useTranslations('dashboard.keys.url')
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
					/>
					<CopyButton value={value} />
				</div>
			}
		/>
	)
}
