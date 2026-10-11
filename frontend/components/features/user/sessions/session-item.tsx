'use client'

import { CardContainer } from '@/components/ui/elements/card-container'
import {
	useFindSessionsByUserQuery,
	useRemoveSessionMutation,
	type FindSessionsByUserQuery
} from '@/graphql/generated/output'
import { getBrowserIcon } from '@/utils/get-browser-icon'
import { useTranslations } from 'next-intl'
import { SessionModal } from './session-modal'
import { Button } from '@/components/ui/common/button'
import { toast } from '@/components/ui/common/toast'
import { ConfirmModal } from '@/components/ui/elements/confirm-modal'

interface Props {
	session: FindSessionsByUserQuery['findSessionsByUser'][0]
	isCurrentSession: boolean
}

export function SessionItem({ isCurrentSession, session }: Props) {
	const t = useTranslations('dashboard.settings.sessions.sessionItem')

	const heading = `${session.metadata.device.browser}, ${session.metadata.device.os}`
	const description = `${session.metadata.location.country}, ${session.metadata.location.city}`

	const { refetch } = useFindSessionsByUserQuery()

	const [remove, { loading: isLoadingRemove }] = useRemoveSessionMutation({
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

	const Icon = getBrowserIcon(session.metadata.device.browser)

	function onConfirm() {
		remove({ variables: { id: session.id } })
	}

	return (
		<CardContainer
			heading={heading}
			description={description}
			Icon={Icon}
			rightContent={
				<div className='flex items-center gap-x-4'>
					{!isCurrentSession && (
						<ConfirmModal
							heading={t('confirmModal.heading')}
							message={t('confirmModal.message')}
							onConfirm={onConfirm}
						>
							<Button
								variant='secondary'
								disabled={isLoadingRemove}
							>
								{t('deleteButton')}
							</Button>
						</ConfirmModal>
					)}
					<SessionModal session={session}>
						<Button>{t('detailsButton')}</Button>
					</SessionModal>
				</div>
			}
		/>
	)
}
