'use client'

import { Button } from '@/components/ui/common/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/common/dialog'
import type { FindChannelByUsernameQuery } from '@/graphql/generated/output'
import { useCurrent } from '@/hooks/useCurrent'
import { Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ChangeThumbnailForm } from './change-thumbnail-form'
import { useState } from 'react'
import { ChangeInfoForm } from './change-info-form'

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function StreamSettings({ channel }: Props) {
	const t = useTranslations('stream.settings')

	const [isOpen, setIsOpen] = useState(false)

	const { user } = useCurrent()

	const isOwnerChannel = user?.id === channel.id

	if (!isOwnerChannel) {
		return null
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger
				render={
					<Button variant='ghost' size='lgIcon'>
						<Pencil className='size-5' />
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t('heading')}</DialogTitle>
				</DialogHeader>
				<ChangeThumbnailForm
					stream={channel.stream}
					setIsOpen={setIsOpen}
				/>
				<ChangeInfoForm stream={channel.stream} setIsOpen={setIsOpen} />
			</DialogContent>
		</Dialog>
	)
}
