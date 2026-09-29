'use client'

import {
	createAccountSchema,
	type CreateAccountFormValues
} from '@/schemas/auth/create-account.schema'
import { AuthWrapper } from '../auth-wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/common/input'
import { Button } from '@/components/ui/common/button'
import { useCreateUserMutation } from '@/graphql/generated/output'
import { toast } from '@/components/ui/common/toast'
import { useState } from 'react'
import {
	Alert,
	AlertDescription,
	AlertTitle
} from '@/components/ui/common/alert'
import { CircleCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function CreateAccountForm() {
	const t = useTranslations('auth.register')
	const [isSuccess, setIsSuccess] = useState(false)
	const [create, { loading: isLoadingCreate }] = useCreateUserMutation({
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

	const form = useForm<CreateAccountFormValues>({
		resolver: zodResolver(createAccountSchema),
		defaultValues: {
			username: '',
			email: '',
			password: ''
		}
	})

	const { isValid } = form.formState

	function onSubmit({ username, email, password }: CreateAccountFormValues) {
		create({
			variables: { data: { password, email, username } }
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
							name='username'
							label={t('usernameLabel')}
							placeholder='johndoe'
							description={t('usernameDescription')}
							disabled={isLoadingCreate}
						/>

						<Input
							name='email'
							label={t('emailLabel')}
							placeholder='john.doe@example.com'
							description={t('emailDescription')}
							disabled={isLoadingCreate}
						/>

						<Input
							name='password'
							label={t('passwordLabel')}
							placeholder='********'
							description={t('passwordDescription')}
							type='password'
							disabled={isLoadingCreate}
						/>

						<Button
							className='mt-2 w-full'
							disabled={!isValid || isLoadingCreate}
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
