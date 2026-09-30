'use client'

import { toast } from '@/components/ui/common/toast'
import { useNewPasswordMutation } from '@/graphql/generated/output'
import {
	newPasswordSchema,
	NewPasswordValues
} from '@/schemas/auth/new-password.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { AuthWrapper } from '../auth-wrapper'

import { Input } from '@/components/ui/common/input'
import { Button } from '@/components/ui/common/button'

export function NewPasswordForm() {
	const t = useTranslations('auth.newPassword')

	const router = useRouter()
	const params = useParams<{ token: string }>()

	const [newPassword, { loading: isLoadingNew }] = useNewPasswordMutation({
		onCompleted: () => {
			toast.add({
				type: 'success',
				description: t('successMessage')
			})
			router.push('/account/login')
		},
		onError: () => {
			toast.add({
				type: 'error',
				description: t('errorMessage')
			})
		}
	})

	const form = useForm<NewPasswordValues>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			password: '',
			passwordRepeat: ''
		}
	})

	const { isValid } = form.formState

	function onSubmit(data: NewPasswordValues) {
		newPassword({
			variables: {
				data: { ...data, token: params.token }
			}
		})
	}
	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref='/account/login'
		>
			<FormProvider {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-y-3'
				>
					<Input
						name='password'
						label={t('passwordLabel')}
						placeholder='********'
						type='password'
						description={t('passwordDescription')}
						disabled={isLoadingNew}
					/>
					<Input
						name='passwordRepeat'
						label={t('passwordRepeatLabel')}
						placeholder='********'
						type='password'
						description={t('passwordRepeatDescription')}
						disabled={isLoadingNew}
					/>
					<Button
						className='mt-2 w-full'
						disabled={!isValid || isLoadingNew}
						type='submit'
					>
						{t('submitButton')}
					</Button>
				</form>
			</FormProvider>
		</AuthWrapper>
	)
}
