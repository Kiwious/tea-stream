'use client'

import { toast } from '@/components/ui/common/toast'
import { ToggleCard } from '@/components/ui/elements/toggle-card'
import {
	changeThemeSchema,
	ChangeThemeSchemaType
} from '@/schemas/user/change-theme.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { FormProvider, useForm } from 'react-hook-form'

export function ChangeThemeForm() {
	const t = useTranslations('dashboard.settings.appearance.theme')

	const { theme, setTheme } = useTheme()

	const form = useForm<ChangeThemeSchemaType>({
		resolver: zodResolver(changeThemeSchema),
		defaultValues: {
			isDark: theme === 'dark'
		}
	})

	function onChange(value: boolean) {
		setTheme(value ? 'dark' : 'light')

		toast.add({
			type: 'success',
			description: t('successMessage')
		})
	}

	return (
		<FormProvider {...form}>
			<form>
				<ToggleCard
					name='isDark'
					heading={t('heading')}
					description={t('description')}
					onChange={onChange}
				></ToggleCard>
			</form>
		</FormProvider>
	)
}
