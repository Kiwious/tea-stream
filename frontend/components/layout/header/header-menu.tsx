'use client'

import { Button } from '@/components/ui/common/button'
import { useAuth } from '@/hooks/useAuth'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ProfileMenu } from './profile-menu'

export function HeaderMenu() {
	const t = useTranslations('layout.headerMenu')

	const { isAuthenticated } = useAuth()

	return (
		<div className='ml-auto flex items-center gap-x-4'>
			{isAuthenticated ? (
				<ProfileMenu />
			) : (
				<>
					<Link href='/account/login'>
						<Button variant='secondary'>{t('login')}</Button>
					</Link>
					<Link href='/account/create'>
						<Button>{t('register')}</Button>
					</Link>
				</>
			)}
		</div>
	)
}
