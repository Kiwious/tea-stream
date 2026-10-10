'use client'

import { Button } from '@/components/ui/common/button'
import { toast } from '@/components/ui/common/toast'
import { ConfirmModal } from '@/components/ui/elements/confirm-modal'
import { useDisableTotpMutation } from '@/graphql/generated/output'
import { useCurrent } from '@/hooks/useCurrent'
import { useTranslations } from 'next-intl'

export function DisableTotp() {
	const t = useTranslations('dashboard.settings.account.twoFactor.disable')

	const { refetch } = useCurrent()

	const [disable, { loading: isLoadingDisable }] = useDisableTotpMutation({
		onCompleted: () => {
			refetch()
			toast.add({
				type: 'success',
				description: t('successMessage')
			})
		},
		onError: () => {
			toast.add({
				type: 'error',
				description: t('errorMessage')
			})
		}
	})

	return (
		<ConfirmModal
			heading={t('heading')}
			message={t('message')}
			onConfirm={disable}
		>
			<Button variant='secondary' disabled={isLoadingDisable}>
				{t('trigger')}
			</Button>
		</ConfirmModal>
	)
}
