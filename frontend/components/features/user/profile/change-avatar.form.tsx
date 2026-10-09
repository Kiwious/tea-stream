'use client'

import { Button } from '@/components/ui/common/button'
import { Skeleton } from '@/components/ui/common/skeleton'
import { toast } from '@/components/ui/common/toast'
import { ChannelAvatar } from '@/components/ui/elements/channel-avatar'
import { ConfirmModal } from '@/components/ui/elements/confirm-modal'
import { FormWrapper } from '@/components/ui/elements/form-wrapper'
import { UploadFile } from '@/components/ui/elements/upload-file'
import {
	useChangeProfileAvatarMutation,
	useRemoveProfileAvatarMutation
} from '@/graphql/generated/output'
import { useCurrent } from '@/hooks/useCurrent'
import {
	uploadFileSchema,
	UploadFileSchemaType
} from '@/schemas/upload-file.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm, useWatch } from 'react-hook-form'

export function ChangeAvatarForm() {
	const t = useTranslations('dashboard.settings.profile.avatar')

	const { user, isLoadingProfile, refetch } = useCurrent()

	const [update, { loading: isLoadingUpdate }] =
		useChangeProfileAvatarMutation({
			onCompleted: () => {
				refetch()
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

	const [remove, { loading: isLoadingRemove }] =
		useRemoveProfileAvatarMutation({
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

	const form = useForm<UploadFileSchemaType>({
		resolver: zodResolver(uploadFileSchema),
		values: {
			file: user?.avatar ?? ''
		}
	})

	const file = useWatch({ control: form.control, name: 'file' })

	const channel = {
		username: user?.username,
		avatar: file instanceof File ? URL.createObjectURL(file) : file
	}

	return isLoadingProfile ? (
		<ChangeProfileAvatarSkeleton />
	) : (
		<FormWrapper heading={t('heading')}>
			<FormProvider {...form}>
				<form>
					<div className='p-5'>
						<div className='w-full items-center space-x-6 lg:flex'>
							<ChannelAvatar channel={channel} size='xl' />
							<div className='space-y-3'>
								<div className='flex items-center gap-x-3'>
									<UploadFile
										name='file'
										label={t('updateButton')}
										isLoading={
											isLoadingUpdate || isLoadingRemove
										}
										mutation={() => {
											update({
												variables: {
													avatar: form.getValues()
														.file
												}
											})
										}}
									/>
									{user?.avatar && (
										<ConfirmModal
											heading={t('confirmModal.heading')}
											message={t('confirmModal.message')}
											onConfirm={remove}
										>
											<Button
												variant='ghost'
												size='lgIcon'
												disabled={
													isLoadingUpdate ||
													isLoadingRemove ||
													isLoadingProfile
												}
											>
												<Trash className='size-4' />
											</Button>
										</ConfirmModal>
									)}
								</div>
								<p className='text-muted-foreground text-sm'>
									{t('info')}
								</p>
							</div>
						</div>
					</div>
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export function ChangeProfileAvatarSkeleton() {
	return <Skeleton className='h-52 w-full rounded-md' />
}
