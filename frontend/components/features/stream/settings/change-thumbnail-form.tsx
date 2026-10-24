import { Button } from '@/components/ui/common/button'
import { Card } from '@/components/ui/common/card'
import { toast } from '@/components/ui/common/toast'
import { ChannelAvatar } from '@/components/ui/elements/channel-avatar'
import { ConfirmModal } from '@/components/ui/elements/confirm-modal'
import { UploadFile } from '@/components/ui/elements/upload-file'
import {
	FindChannelByUsernameQuery,
	useChangeStreamThumbnailMutation,
	useRemoveStreamThumbnailMutation
} from '@/graphql/generated/output'
import { useCurrent } from '@/hooks/useCurrent'
import { revalidateChannel } from '@/libs/revalidate'
import {
	uploadFileSchema,
	UploadFileSchemaType
} from '@/schemas/upload-file.schema'
import { getMediaSource } from '@/utils/get-media-source'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { FormProvider, useForm, useWatch } from 'react-hook-form'

interface Props {
	stream: FindChannelByUsernameQuery['findChannelByUsername']['stream']
	setIsOpen: (value: boolean) => void
}

export function ChangeThumbnailForm({ stream, setIsOpen }: Props) {
	const t = useTranslations('stream.settings.thumbnail')

	const { user } = useCurrent()

	const form = useForm<UploadFileSchemaType>({
		resolver: zodResolver(uploadFileSchema),
		values: {
			file: getMediaSource(stream.thumbnailUrl)
		}
	})

	const [update, { loading: isLoadingUpdate }] =
		useChangeStreamThumbnailMutation({
			onCompleted: () => {
				setIsOpen(false)
				revalidateChannel(user!.username)
				toast.add({
					type: 'success',
					description: t('successUpdateMessage')
				})
			},
			onError: () => {
				setIsOpen(false)
				toast.add({
					type: 'error',
					description: t('errorUpdateMessage')
				})
			}
		})

	const [remove, { loading: isLoadingRemove }] =
		useRemoveStreamThumbnailMutation({
			onCompleted: () => {
				setIsOpen(false)
				revalidateChannel(user!.username)
				toast.add({
					type: 'success',
					description: t('successRemoveMessage')
				})
			},
			onError: () => {
				setIsOpen(false)
				toast.add({
					type: 'error',
					description: t('errorRemoveMessage')
				})
			}
		})

	const file = useWatch({ control: form.control, name: 'file' })

	function onSubmit() {
		update({ variables: { thumbnail: form.getValues('file') } })
	}

	const imageUrl = file instanceof File ? URL.createObjectURL(file) : file!

	return (
		<FormProvider {...form}>
			<div className='flex items-center space-x-6'>
				{stream.thumbnailUrl ? (
					<Image
						src={imageUrl}
						alt={stream.title}
						width={190}
						height={80}
						className='aspect-video rounded-lg'
					/>
				) : (
					<Card className='flex h-28 w-full flex-col items-center justify-center rounded-lg'>
						<ChannelAvatar channel={user!} />
					</Card>
				)}
				<div className='flex w-full items-center gap-x-3'>
					<UploadFile
						label={t('updateButton')}
						mutation={onSubmit}
						disabled={isLoadingUpdate || isLoadingRemove}
					/>
					{stream.thumbnailUrl && (
						<ConfirmModal
							heading={t('confirmModal.heading')}
							message={t('confirmModal.message')}
							onConfirm={() => remove()}
						>
							<Button
								variant='ghost'
								size='icon'
								disabled={isLoadingRemove || isLoadingUpdate}
							>
								<Trash className='size-4' />
							</Button>
						</ConfirmModal>
					)}
				</div>
			</div>
			<p className='text-muted-foreground text-sm'>{t('info')}</p>
		</FormProvider>
	)
}
