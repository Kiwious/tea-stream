'use client'

import { toast } from '@/components/ui/common/toast'
import { useDeactivateAccountMutation } from '@/graphql/generated/output'
import { useAuth } from '@/hooks/useAuth'
import {
	deactivateSchema,
	DeactivateSchemaType
} from '@/schemas/auth/deactivate.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AuthWrapper } from '../auth-wrapper'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot
} from '@/components/ui/common/input-otp'
import { Input } from '@/components/ui/common/input'
import { Button } from '@/components/ui/common/button'

export function DeactivateForm() {
	const t = useTranslations('auth.deactivate')

	const router = useRouter()

	const { exit } = useAuth()

	const [isShowConfirm, setIsShowConfirm] = useState(false)

	const form = useForm<DeactivateSchemaType>({
		resolver: zodResolver(deactivateSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const [deactivate, { loading: isLoadingDeactivate }] =
		useDeactivateAccountMutation({
			onCompleted: data => {
				if (data.deactivateAccount.message) {
					setIsShowConfirm(true)
				} else {
					exit()
					toast.add({
						type: 'success',
						description: t('successMessage')
					})
					router.push('/')
				}
			}
		})

	const { isValid } = form.formState

	function onSubmit(data: DeactivateSchemaType) {
		deactivate({
			variables: {
				data
			}
		})
	}

	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref='/dashboard/settings'
		>
			<FormProvider {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-y-3'
				>
					{isShowConfirm ? (
						<InputOTP
							name='pin'
							label={t('pinLabel')}
							description={t('pinDescription')}
							maxLength={6}
							disabled={isLoadingDeactivate}
							autoFocus
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
								name='email'
								label={t('emailLabel')}
								placeholder='john.doe@example.com'
								description={t('emailLabel')}
								disabled={isLoadingDeactivate}
							/>

							<Input
								name='password'
								label={t('passwordLabel')}
								placeholder='********'
								description={t('passwordDescription')}
								type='password'
								disabled={isLoadingDeactivate}
							/>
						</>
					)}

					<Button
						className='mt-2 w-full'
						disabled={!isValid || isLoadingDeactivate}
						type='submit'
					>
						{t('submitButton')}
					</Button>
				</form>
			</FormProvider>
		</AuthWrapper>
	)
}
