'use client'

import { toast } from '@/components/ui/common/toast'
import { useResetPasswordMutation } from '@/graphql/generated/output'
import {
	resetPasswordSchema,
	type ResetPasswordValues
} from '@/schemas/auth/reset-password.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AuthWrapper } from '../auth-wrapper'
import {
	Alert,
	AlertDescription,
	AlertTitle
} from '@/components/ui/common/alert'
import { CircleCheck } from 'lucide-react'
import { Input } from '@/components/ui/common/input' 
import { Button } from '@/components/ui/common/button'

export function ResetPasswordForm() {
	const t = useTranslations('auth.resetPassword')
	const [isSuccess, setIsSuccess] = useState(false)
	const [resetPassword, { loading: isLoadingReset }] =
		useResetPasswordMutation({
			onCompleted: () => {
				setIsSuccess(true)
			},
			onError: () => {
				toast.add({
					type: 'error',
					description: t('errorMessage')
				})
			}
		})

	const form = useForm<ResetPasswordValues>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			email: ''
		}
	})

	const { isValid } = form.formState

	function onSubmit({ email }: ResetPasswordValues) {
		resetPassword({
			variables: { data: { email } }
		})
	}
	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref='/account/login'
		>
			{isSuccess ? (
				<Alert>
					<CircleCheck className='size-4' />
					<AlertTitle>{t('successAlertTitle')}</AlertTitle>
					<AlertDescription>
						{t('successAlertDescription')}
					</AlertDescription>
				</Alert>
			) : (
				<FormProvider {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='grid gap-y-3'
					>
						<Input
							name='email'
							label={t('emailLabel')}
							placeholder='john.doe@example.com'
							description={t('emailDescription')}
							disabled={isLoadingReset}
						/>

						<Button
							className='mt-2 w-full'
							disabled={!isValid || isLoadingReset}
							type='submit'
						>
							{t('submitButton')}
						</Button>
					</form>
				</FormProvider>
			)}
		</AuthWrapper>
	)
}
