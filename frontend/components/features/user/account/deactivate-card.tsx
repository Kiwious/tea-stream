'use client'

import { Button } from '@/components/ui/common/button'
import { CardContainer } from '@/components/ui/elements/card-container'
import { ConfirmModal } from '@/components/ui/elements/confirm-modal'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export function DeactivateCard() {
	const t = useTranslations('dashboard.settings.account.deactivation')

	const router = useRouter()

	function onConfirm() {
		router.push('/account/deactivate')
	}

	return (
		<CardContainer
			heading={t('heading')}
			description={t('description')}
			rightContent={
				<div className='flex items-center gap-x-4'>
					<ConfirmModal
						heading={t('confirmModal.heading')}
						message={t('confirmModal.message')}
						onConfirm={onConfirm}
					>
						<Button>{t('deactivateButton')}</Button>
					</ConfirmModal>
				</div>
			}
		></CardContainer>
	)
}
