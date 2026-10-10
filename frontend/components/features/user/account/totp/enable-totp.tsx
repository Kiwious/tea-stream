'use client'

import { Button } from '@/components/ui/common/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/common/dialog'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot
} from '@/components/ui/common/input-otp'
import { toast } from '@/components/ui/common/toast'
import {
	useEnableTotpMutation,
	useGenerateTotpSecretQuery
} from '@/graphql/generated/output'
import { useCurrent } from '@/hooks/useCurrent'
import {
	enableTotpSchema,
	type EnableTotpSchemaType
} from '@/schemas/user/enable-totp.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export function EnableTotp() {
	const t = useTranslations('dashboard.settings.account.twoFactor.enable')

	const [isOpen, setIsOpen] = useState(false)
	const { refetch } = useCurrent()

	const { data, loading: isLoadingSecret } = useGenerateTotpSecretQuery()
	const totpSecret = data?.generateTotpSecret

	const form = useForm<EnableTotpSchemaType>({
		resolver: zodResolver(enableTotpSchema),
		defaultValues: {
			pin: ''
		}
	})

	const [enable, { loading: isLoadingEnable }] = useEnableTotpMutation({
		onCompleted: () => {
			refetch()
			setIsOpen(false)
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

	function onSubmit(data: EnableTotpSchemaType) {
		enable({
			variables: {
				data: {
					pin: data.pin,
					secret: totpSecret?.secret ?? ''
				}
			}
		})
	}

	const rhfConfig = {
		onSubmit: form.handleSubmit(onSubmit)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger
				render={<Button>{t('trigger')}</Button>}
			></DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>{t('heading')}</DialogTitle>
				</DialogHeader>
				<FormProvider {...form}>
					<form {...rhfConfig} className='flex flex-col gap-4'>
						<div className='flex flex-col items-center justify-center gap-4'>
							<span className='text-muted-foreground text-sm'>
								{totpSecret?.qrcodeUrl
									? t('qrInstructions')
									: ''}
							</span>
							<img
								className='rounded-lg'
								src={totpSecret?.qrcodeUrl}
								alt='QR'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<span className='text-muted-foreground text-center text-sm'>
								{totpSecret?.secret
									? t('secretCodeLabel') + totpSecret.secret
									: ''}
							</span>
						</div>
						<InputOTP
							name='pin'
							label={t('pinLabel')}
							description={t('pinDescription')}
							maxLength={6}
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

						<DialogFooter>
							<Button
								type='submit'
								disabled={
									!isValid ||
									isLoadingSecret ||
									isLoadingEnable
								}
							>
								{t('submitButton')}
							</Button>
						</DialogFooter>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	)
}
