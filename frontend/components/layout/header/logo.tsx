'use client'

import { LogoImage } from '@/components/images/logo-image'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export function Logo() {
	const t = useTranslations('layout.header.logo')
	return (
		<Link
			href='/'
			className='flex items-center gap-x-4 transition-opacity hover:opacity-75'
		>
			<LogoImage />
			<div className='hidden leading-tight lg:block'>
				<h2 className='text-accent-foreground text-lg font-semibold tracking-wider'>
					TeaStream
				</h2>
				<p className='text-muted-foreground text-sm'>{t('platform')}</p>
			</div>
		</Link>
	)
}
