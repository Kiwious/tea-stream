'use client'

import { Button } from '@/components/ui/common/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/common/dialog'
import { Input } from '@/components/ui/common/input'
import { Textarea } from '@/components/ui/common/textarea'
import { toast } from '@/components/ui/common/toast'
import {
	useCreateSponsorshipPlanMutation,
	useFindMySponsorshipPlansQuery
} from '@/graphql/generated/output'
import {
	createSponsorshipPlanSchema,
	type CreateSponsorshipPlanSchemaInput,
	type CreateSponsorshipPlanSchemaType
} from '@/schemas/plan/create-plan.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export function CreatePlanForm() {
	const t = useTranslations('dashboard.plans.createForm')

	const [isOpen, setIsOpen] = useState(false)

	const form = useForm<
		CreateSponsorshipPlanSchemaInput,
		unknown,
		CreateSponsorshipPlanSchemaType
	>({
		resolver: zodResolver(createSponsorshipPlanSchema),
		defaultValues: {
			title: '',
			description: '',
			price: 0
		}
	})

	const { refetch } = useFindMySponsorshipPlansQuery()

	const [create, { loading: isLoadingCreate }] =
		useCreateSponsorshipPlanMutation({
			onCompleted: () => {
				setIsOpen(false)
				form.reset()
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

	const { isValid } = form.formState

	function onSubmit(data: CreateSponsorshipPlanSchemaType) {
		create({ variables: { data } })
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger render={<Button>{t('trigger')}</Button>} />
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t('heading')}</DialogTitle>
				</DialogHeader>
				<FormProvider {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-4'
					>
						<Input
							name='title'
							label={t('titleLabel')}
							placeholder={t('titlePlaceholder')}
							description={t('titleDescription')}
							disabled={isLoadingCreate}
						/>
						<Textarea
							name='description'
							label={t('descriptionLabel')}
							placeholder={t('descriptionPlaceholder')}
							description={t('descriptionDescription')}
							disabled={isLoadingCreate}
						/>
						<Input
							name='price'
							label={t('priceLabel')}
							placeholder={t('priceLabel')}
							description={t('priceDescription')}
							disabled={isLoadingCreate}
							type='number'
						/>
						<div className='mt-5 flex justify-end'>
							<Button
								type='submit'
								disabled={!isValid || isLoadingCreate}
							>
								{t('submitButton')}
							</Button>
						</div>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	)
}
