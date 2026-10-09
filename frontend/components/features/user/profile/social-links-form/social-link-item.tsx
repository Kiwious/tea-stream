'use client'

import { Button } from '@/components/ui/common/button'
import { Input } from '@/components/ui/common/input'
import { Separator } from '@/components/ui/common/separator'
import { toast } from '@/components/ui/common/toast'
import {
	useFindSocialLinksQuery,
	useRemoveSocialLinkMutation,
	useUpdateSocialLinkMutation,
	type FindSocialLinksQuery
} from '@/graphql/generated/output'
import {
	socialLinksSchema,
	type SocialLinksSchemaType
} from '@/schemas/user/social-links.schema'
import type { DraggableProvided } from '@hello-pangea/dnd'
import { zodResolver } from '@hookform/resolvers/zod'
import { GripVertical, Pencil, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

interface Props {
	socialLink: FindSocialLinksQuery['findSocialLinks'][0]
	provided: DraggableProvided
}

export function SocialLinkItem({ provided, socialLink }: Props) {
	const t = useTranslations('dashboard.settings.profile.socialLinks.editForm')

	const [editingId, setEditingId] = useState<string | null>(null)

	const { refetch } = useFindSocialLinksQuery()

	const form = useForm<SocialLinksSchemaType>({
		resolver: zodResolver(socialLinksSchema),
		defaultValues: {
			title: socialLink.title ?? '',
			url: socialLink.url ?? ''
		}
	})

	const { isValid, isDirty } = form.formState

	function toggleEditing(id: string | null) {
		setEditingId(id)
	}

	const [update, { loading: isLoadingUpdate }] = useUpdateSocialLinkMutation({
		onCompleted: () => {
			refetch()
			toggleEditing(null)
			toast.add({
				type: 'success',
				description: t('successUpdateMessage')
			})
		},
		onError: () => {
			toast.add({
				type: 'error',
				description: t('errorUpdateMessage')
			})
		}
	})

	const [remove, { loading: isLoadingRemove }] = useRemoveSocialLinkMutation({
		onCompleted: () => {
			refetch()
			toast.add({
				type: 'success',
				description: t('successRemoveMessage')
			})
		},
		onError: () => {
			toast.add({
				type: 'error',
				description: t('errorRemoveMessage')
			})
		}
	})

	function onSubmit(data: SocialLinksSchemaType) {
		update({ variables: { data, id: socialLink.id } })
	}

	function editSocialLink() {
		toggleEditing(socialLink.id)
	}

	function removeSocialLink() {
		remove({ variables: { id: socialLink.id } })
	}

	const rhfConfig = {
		onSubmit: form.handleSubmit(onSubmit)
	}

	return (
		<div
			className='border-border bg-background mb-4 flex items-center gap-x-2 rounded-md border text-sm'
			ref={provided.innerRef}
			{...provided.draggableProps}
		>
			<div
				className='border-r-border text-foreground rounded-l-md border-r px-2 py-9 transition'
				{...provided.dragHandleProps}
			>
				<GripVertical className='size-5' />
			</div>
			<div className='space-y-1 px-2'>
				{editingId === socialLink.id ? (
					<FormProvider {...form}>
						<form {...rhfConfig} className='flex gap-x-6'>
							<div className='w-96 space-y-2'>
								<Input
									className='h-8'
									name='title'
									disabled={
										isLoadingRemove || isLoadingUpdate
									}
								/>
								<Input
									className='h-8'
									name='url'
									disabled={
										isLoadingRemove || isLoadingUpdate
									}
								/>
							</div>
							<div className='flex items-center gap-x-4'>
								<Button
									variant='secondary'
									onClick={() => toggleEditing(null)}
								>
									{t('cancelButton')}
								</Button>
								<Button
									type='submit'
									disabled={
										isLoadingUpdate || !isDirty || !isValid
									}
								>
									{t('submitButton')}
								</Button>
							</div>
						</form>
					</FormProvider>
				) : (
					<>
						<h2 className='text-foreground text-[17px] font-semibold tracking-wide'>
							{socialLink.title}
						</h2>
						<p className='text-muted-foreground'>
							{socialLink.url}
						</p>
					</>
				)}
			</div>
			<div className='ml-auto flex items-center gap-x-2 pr-4'>
				{editingId !== socialLink.id && (
					<>
						<Button
							onClick={editSocialLink}
							variant='ghost'
							size='lgIcon'
						>
							<Pencil className='text-muted-foreground size-4' />
						</Button>
						<Button
							onClick={removeSocialLink}
							variant='ghost'
							size='lgIcon'
						>
							<Trash2 className='text-muted-foreground size-4' />
						</Button>
					</>
				)}
			</div>
		</div>
	)
}
