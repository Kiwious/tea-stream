'use client'

import { Select } from '@/components/ui/common/select'
import { toast } from '@/components/ui/common/toast'
import { CardContainer } from '@/components/ui/elements/card-container'
import type { Language } from '@/libs/i18n/config'
import { setLanguage } from '@/libs/i18n/language'
import {
	changeLanguageSchema,
	ChangeLanguageSchemaType
} from '@/schemas/user/change-language.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const languages: Record<Language, string> = {
	de: 'Deutsch',
	en: 'English'
} as const

export function ChangeLanguageForm() {
	const t = useTranslations('dashboard.settings.appearance.language')

	const [isPending, startTransition] = useTransition()

	const locale = useLocale()

	const form = useForm<ChangeLanguageSchemaType>({
		resolver: zodResolver(changeLanguageSchema),
		defaultValues: {
			language: locale as ChangeLanguageSchemaType['language']
		}
	})

	function onChange(value: string) {
		startTransition(async () => {
			try {
				await setLanguage(value as Language)
			} catch {
				toast.add({
					type: 'success',
					description: t('successMessage')
				})
			}
		})
	}

	return (
		<FormProvider {...form}>
			<form>
				<CardContainer
					heading={t('heading')}
					description={t('description')}
					rightContent={
						<Select
							name='language'
							placeholder={t('selectPlaceholder')}
							items={languages}
							onChange={onChange}
							disabled={isPending}
						/>
					}
				></CardContainer>
			</form>
		</FormProvider>
	)
}
