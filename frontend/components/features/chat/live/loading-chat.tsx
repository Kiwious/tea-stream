'use client'

import { Card } from '@/components/ui/common/card'
import { Loader } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function LoadingChat() {
	const t = useTranslations('stream.chat')
	return (
		<Card className='flex h-[82%] w-full flex-col items-center justify-center overflow-y-auto lg:fixed lg:w-[21.5%] xl:mt-0'>
			<Loader className='text-muted-foreground size-10 animate-spin' />
			<p className='text-muted-foreground mt-3 text-lg'>{t('loading')}</p>
		</Card>
	)
}
