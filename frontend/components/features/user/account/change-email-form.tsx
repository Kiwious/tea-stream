'use client'

import { Button } from '@/components/ui/common/button'
import { Input } from '@/components/ui/common/input'
import { Separator } from '@/components/ui/common/separator'
import { Skeleton } from '@/components/ui/common/skeleton'
import { toast } from '@/components/ui/common/toast'
import { FormWrapper } from '@/components/ui/elements/form-wrapper'
import { useChangeEmailMutation } from '@/graphql/generated/output'
import { useCurrent } from '@/hooks/useCurrent'
import {
	changeEmailSchema,
	type ChangeEmailSchemaType
} from '@/schemas/user/change-email.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

export function ChangeEmailForm() {
	const t = useTranslations('dashboard.settings.account.email')

	const { user, isLoadingProfile, refetch } = useCurrent()

	const form = useForm<ChangeEmailSchemaType>({
		resolver: zodResolver(changeEmailSchema),
		defaultValues: {
			email: user?.email ?? ''
		}
	})

	const [update, { loading: isLoadingUpdate }] = useChangeEmailMutation({
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

	const { isValid, isDirty } = form.formState

	function onSubmit(data: ChangeEmailSchemaType) {
		update({ variables: { data } })
	}

	const rhfConfig = {
		onSubmit: form.handleSubmit(onSubmit)
	}

	if (isLoadingProfile) return <ChangeEmailFormSkeleton />

	return (
		<FormWrapper heading={t('heading')}>
			<FormProvider {...form}>
				<form {...rhfConfig} className='grid gap-y-3'>
					<div className='px-5'>
						<Input
							name='email'
							label={t('emailLabel')}
							description={t('emailDescription')}
							placeholder='johndoe@example.com'
						/>
					</div>
					<Separator />
					<div className='flex justify-end p-5'>
						<Button
							disabled={!isValid || !isDirty || isLoadingUpdate}
							type='submit'
						>
							{t('submitButton')}
						</Button>
					</div>
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export function ChangeEmailFormSkeleton() {
	return <Skeleton className='h-64 w-full' />
}
