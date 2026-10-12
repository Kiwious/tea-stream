'use client'

import { Card } from '@/components/ui/common/card'
import { Loader } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function LoadingStream() {
	const t = useTranslations('stream.video')

	return (
		<Card className='relative flex h-full flex-col items-center justify-center'>
			<Loader className='text-muted-foreground size-12 animate-spin' />
			<p className='text-muted-foreground mt-3 text-lg'>{t('loading')}</p>
		</Card>
	)
}
