'use client'

import { toast } from '@/components/ui/common/toast'
import { useLoginUserMutation } from '@/graphql/generated/output'
import { type LoginFormValues, loginSchema } from '@/schemas/auth/login.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { AuthWrapper } from '../auth-wrapper'
import { Input } from '@/components/ui/common/input'
import { Button } from '@/components/ui/common/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot
} from '@/components/ui/common/input-otp'
import Link from 'next/link'
import { Label } from '@/components/ui/common/label'

export function LoginForm() {
	const t = useTranslations('auth.login')

	const router = useRouter()

	const [isShowTwoFactor, setIsShowTwoFactor] = useState(false)

	const [loginMutation, { loading: isLoadingLogin }] = useLoginUserMutation({
		onCompleted: data => {
			if (data.loginUser.message) {
				setIsShowTwoFactor(true)
			} else {
				toast.add({
					type: 'success',
					description: t('successMessage')
				})
				router.push('/dashboard/settings')
			}
		}
	})

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			login: '',
			password: '',
			pin: ''
		}
	})

	const { isValid } = form.formState

	function onSubmit({ password, login, pin }: LoginFormValues) {
		loginMutation({
			variables: {
				data: {
					login,
					password,
					pin: pin || undefined
				}
			}
		})
	}

	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref='/account/create'
		>
			<FormProvider {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-y-3'
				>
					{isShowTwoFactor ? (
						<InputOTP
							name='pin'
							label={t('pinLabel')}
							description={t('pinDescription')}
							maxLength={6}
							disabled={isLoadingLogin}
						>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>
						</InputOTP>
					) : (
						<>
							<Input
								name='login'
								label={t('loginLabel')}
								placeholder='johndoe'
								description={t('loginLabel')}
								disabled={isLoadingLogin}
							/>

							<Input
								name='password'
								label={
									<div className='flex w-full items-center justify-between'>
										<div>{t('passwordLabel')}</div>
										<Link
											href='/account/recovery'
											className='ml-auto inline-block text-sm'
										>
											{t('forgotPassword')}
										</Link>
									</div>
								}
								placeholder='********'
								description={t('passwordDescription')}
								type='password'
								disabled={isLoadingLogin}
							/>
						</>
					)}

					<Button
						className='mt-2 w-full'
						disabled={!isValid || isLoadingLogin}
						type='submit'
					>
						{t('submitButton')}
					</Button>
				</form>
			</FormProvider>
		</AuthWrapper>
	)
}
