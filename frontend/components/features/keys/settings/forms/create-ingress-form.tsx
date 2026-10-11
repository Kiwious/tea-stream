'use client'

import { Button } from '@/components/ui/common/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/common/dialog'
import { Select } from '@/components/ui/common/select'
import { toast } from '@/components/ui/common/toast'
import { useCreateIngressMutation } from '@/graphql/generated/output'
import { useCurrent } from '@/hooks/useCurrent'
import {
	createIngressSchema,
	type CreateIngressSchemaType,
	IngressType
} from '@/schemas/stream/create-ingress.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export function CreateIngressForm() {
	const t = useTranslations('dashboard.keys.createModal')

	const [isOpen, setIsOpen] = useState(false)
	const { refetch } = useCurrent()

	const form = useForm<CreateIngressSchemaType>({
		resolver: zodResolver(createIngressSchema),
		defaultValues: {
			ingressType: IngressType.RTMP
		}
	})

	const [create, { loading: isLoadingCreate }] = useCreateIngressMutation({
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

	function onSubmit(data: CreateIngressSchemaType) {
		create({ variables: { ingressType: data.ingressType } })
	}

	const items = {
		[IngressType.RTMP]: 'RTMP',
		[IngressType.WHIP]: 'WHIP'
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger render={<Button>{t('trigger')}</Button>} />
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t('heading')}</DialogTitle>
				</DialogHeader>
				<FormProvider {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-6'
					>
						<Select
							name='ingressType'
							label={t('ingressTypeLabel')}
							description={t('ingressTypeDescription')}
							items={items}
							placeholder={t('ingressTypePlaceholder')}
						/>
						<div className='flex justify-end'>
							<Button
								type='submit'
								disabled={!isValid || isLoadingCreate}
							>
								{t('submitButton')}
							</Button>
						</div>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	)
}
