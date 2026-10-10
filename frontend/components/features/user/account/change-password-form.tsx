'use client'

import { Button } from '@/components/ui/common/button'
import { Input } from '@/components/ui/common/input'
import { Separator } from '@/components/ui/common/separator'
import { toast } from '@/components/ui/common/toast'
import { FormWrapper } from '@/components/ui/elements/form-wrapper'
import { useChangePasswordMutation } from '@/graphql/generated/output'
import {
	changePasswordSchema,
	type ChangePasswordSchemaType
} from '@/schemas/user/change-password.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

export function ChangePasswordForm() {
	const t = useTranslations('dashboard.settings.account.password')

	const form = useForm<ChangePasswordSchemaType>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			oldPassword: '',
			newPassword: ''
		}
	})

	const [update, { loading: isLoadingUpdate }] = useChangePasswordMutation({
		onCompleted: () => {
			form.reset()
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

	function onSubmit(data: ChangePasswordSchemaType) {
		update({ variables: { data } })
	}

	const rhfConfig = {
		onSubmit: form.handleSubmit(onSubmit)
	}

	return (
		<FormWrapper heading={t('heading')}>
			<FormProvider {...form}>
				<form {...rhfConfig} className='grid gap-y-3'>
					<div className='px-5'>
						<Input
							name='oldPassword'
							label={t('oldPasswordLabel')}
							description={t('oldPasswordDescription')}
							placeholder='********'
							type='password'
						/>
					</div>
					<div className='px-5'>
						<Input
							name='newPassword'
							label={t('newPasswordLabel')}
							description={t('newPasswordDescription')}
							placeholder='********'
							type='password'
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
