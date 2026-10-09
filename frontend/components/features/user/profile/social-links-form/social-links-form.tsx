'use client'

import { Button } from '@/components/ui/common/button'
import { Input } from '@/components/ui/common/input'
import { Separator } from '@/components/ui/common/separator'
import { Skeleton } from '@/components/ui/common/skeleton'
import { toast } from '@/components/ui/common/toast'
import { FormWrapper } from '@/components/ui/elements/form-wrapper'
import {
	useCreateSocialLinkMutation,
	useFindSocialLinksQuery
} from '@/graphql/generated/output'
import {
	socialLinksSchema,
	SocialLinksSchemaType
} from '@/schemas/user/social-links.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { SocialLinksList } from './social-links-list'

export function SocialLinksForm() {
	const t = useTranslations(
		'dashboard.settings.profile.socialLinks.createForm'
	)

	const { refetch, loading: isLoadingLinks } = useFindSocialLinksQuery()

	const form = useForm<SocialLinksSchemaType>({
		resolver: zodResolver(socialLinksSchema),
		defaultValues: {
			title: '',
			url: ''
		}
	})

	const [create, { loading: isLoadingCreate }] = useCreateSocialLinkMutation({
		onCompleted: () => {
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

	function onSubmit(data: SocialLinksSchemaType) {
		create({ variables: { data } })
	}

	const rhfConfig = {
		onSubmit: form.handleSubmit(onSubmit)
	}

	if (isLoadingLinks) return <SocialLinksSkeleton />

	return (
		<FormWrapper heading={t('heading')}>
			<FormProvider {...form}>
				<form {...rhfConfig} className='grid gap-y-3 pb-3'>
					<div className='px-5'>
						<Input
							name='title'
							label={t('titleLabel')}
							description={t('titleDescription')}
							placeholder={t('titlePlaceholder')}
						/>
					</div>
					<Separator />
					<div className='px-5'>
						<Input
							name='url'
							label={t('urlLabel')}
							description={t('urlDescription')}
							placeholder={t('urlPlaceholder')}
						/>
					</div>
					<Separator />
					<div className='flex justify-end p-5'>
						<Button
							disabled={!isValid || isLoadingCreate}
							type='submit'
						>
							{t('submitButton')}
						</Button>
					</div>
				</form>
			</FormProvider>
			<Separator />
			<SocialLinksList />
		</FormWrapper>
	)
}

export function SocialLinksSkeleton() {
	return <Skeleton className='h-72 w-full' />
}
