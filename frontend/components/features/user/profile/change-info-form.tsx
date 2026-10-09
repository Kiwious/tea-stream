'use client'

import { Button } from '@/components/ui/common/button'
import { Input } from '@/components/ui/common/input'
import { Separator } from '@/components/ui/common/separator'
import { Skeleton } from '@/components/ui/common/skeleton'
import { Textarea } from '@/components/ui/common/textarea'
import { toast } from '@/components/ui/common/toast'
import { FormWrapper } from '@/components/ui/elements/form-wrapper'
import { useChangeProfileInfoMutation } from '@/graphql/generated/output'
import { useCurrent } from '@/hooks/useCurrent'
import {
	changeInfoSchema,
	type ChangeInfoSchemaType
} from '@/schemas/user/change-info.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

export function ChangeInfoForm() {
	const t = useTranslations('dashboard.settings.profile.info')

	const { user, isLoadingProfile, refetch } = useCurrent()

	const form = useForm<ChangeInfoSchemaType>({
		resolver: zodResolver(changeInfoSchema),
		values: {
			username: user?.username ?? '',
			displayName: user?.displayName ?? '',
			bio: user?.bio ?? ''
		}
	})

	const [update, { loading: isLoadingInfo }] = useChangeProfileInfoMutation({
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

	function onSubmit(data: ChangeInfoSchemaType) {
		update({ variables: { data } })
	}

	const rhfConfig = {
		onSubmit: form.handleSubmit(onSubmit)
	}

	if (isLoadingProfile) return <ChangeInfoFormSkeleton />

	return (
		<FormWrapper heading={t('heading')}>
			<FormProvider {...form}>
				<form {...rhfConfig} className='grid gap-y-3 pb-3'>
					<div className='px-5'>
						<Input
							name='username'
							label={t('usernameLabel')}
							placeholder={t('usernamePlaceholder')}
							description={t('usernameDescription')}
							disabled={isLoadingInfo}
						/>
					</div>
					<Separator />
					<div className='px-5'>
						<Input
							name='displayName'
							label={t('displayNameLabel')}
							placeholder={t('displayNamePlaceholder')}
							description={t('displayNameDescription')}
							disabled={isLoadingInfo}
						/>
					</div>
					<Separator />
					<div className='px-5'>
						<Textarea
							label={t('bioLabel')}
							name='bio'
							placeholder={t('bioPlaceholder')}
							disabled={isLoadingInfo}
						/>
					</div>
					<Separator />
					<div className='flex justify-end p-5'>
						<Button
							disabled={!isValid || !isDirty || isLoadingInfo}
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

export function ChangeInfoFormSkeleton() {
	return <Skeleton className='h96 w-full' />
}
