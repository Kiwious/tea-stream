'use client'

import { Skeleton } from '@/components/ui/common/skeleton'
import { CardContainer } from '@/components/ui/elements/card-container'
import { useCurrent } from '@/hooks/useCurrent'
import { useTranslations } from 'next-intl'
import { EnableTotp } from './enable-totp'
import { DisableTotp } from './disable-totp'

export function WrapperTotp() {
	const t = useTranslations('dashboard.settings.account.twoFactor')

	const { user, isLoadingProfile } = useCurrent()

	if (isLoadingProfile) return <WrapperTotpSkeleton />

	return (
		<CardContainer
			heading={t('heading')}
			description={t('description')}
			rightContent={
				<div className='glex items-center gap-x-4'>
					{!user?.isTotpEnabled ? <EnableTotp /> : <DisableTotp />}
				</div>
			}
		></CardContainer>
	)
}

export function WrapperTotpSkeleton() {
	return <Skeleton className='h-24 w-full' />
}
