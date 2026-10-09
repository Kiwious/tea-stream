'use client'

import { useTranslations } from 'next-intl'
import type { ReactElement } from 'react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '../common/alert-dialog'

interface Props {
	heading: string
	message: string
	onConfirm: () => void
	children: ReactElement
}

export function ConfirmModal({ children, heading, message, onConfirm }: Props) {
	const t = useTranslations('components.confirmModal')

	return (
		<AlertDialog>
			<AlertDialogTrigger render={children} />
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{heading}</AlertDialogTitle>
					<AlertDialogDescription>{message}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
					<AlertDialogAction onClick={onConfirm}>
						{t('continue')}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
