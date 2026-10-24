import { Button } from '@/components/ui/common/button'
import { Input } from '@/components/ui/common/input'
import { Select } from '@/components/ui/common/select'
import { toast } from '@/components/ui/common/toast'
import {
	FindChannelByUsernameQuery,
	useChangeStreamInfoMutation,
	useFindAllCategoriesQuery
} from '@/graphql/generated/output'
import {
	changeStreamInfoSchema,
	type ChangeStreamInfoSchemaType
} from '@/schemas/stream/change-stream-info.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

interface Props {
	stream: FindChannelByUsernameQuery['findChannelByUsername']['stream']
	setIsOpen: (value: boolean) => void
}

export function ChangeInfoForm({ stream, setIsOpen }: Props) {
	const t = useTranslations('stream.settings.info')

	const { data } = useFindAllCategoriesQuery()
	const categories = data?.findAllCategories ?? []

	const form = useForm<ChangeStreamInfoSchemaType>({
		resolver: zodResolver(changeStreamInfoSchema),
		values: {
			title: stream?.title ?? '',
			categoryId: stream?.category?.id ?? ''
		}
	})

	const [update, { loading: isLoadingUpdate }] = useChangeStreamInfoMutation({
		onCompleted: () => {
			toast.add({
				type: 'success',
				description: t('successMessage')
			})
			setIsOpen(false)
		},
		onError: () => {
			toast.add({
				type: 'error',
				description: t('errorMessage')
			})
			setIsOpen(false)
		}
	})

	const items = Object.fromEntries(
		categories.map(category => [category.id, category.title])
	)

	const { isValid } = form.formState

	function onSubmit(data: ChangeStreamInfoSchemaType) {
		update({ variables: { data } })
	}

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid gap-y-3'
			>
				<Input
					name='title'
					label={t('titleLabel')}
					description={t('titleDescription')}
					placeholder={t('titlePlaceholder')}
				/>
				<Select
					name='categoryId'
					label={t('categoryLabel')}
					description={t('categoryDescription')}
					placeholder={t('categoryPlaceholder')}
					items={items}
				/>
				<div className='flex justify-end pt-5'>
					<Button
						type='submit'
						disabled={!isValid || isLoadingUpdate}
					>
						{t('submitButton')}
					</Button>
				</div>
			</form>
		</FormProvider>
	)
}
