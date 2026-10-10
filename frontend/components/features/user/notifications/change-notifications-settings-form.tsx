'use client'

import { toast } from '@/components/ui/common/toast'
import {
	ToggleCard,
	ToggleCardSkeleton
} from '@/components/ui/elements/toggle-card'
import { useChangeNotificationsSettingsMutation } from '@/graphql/generated/output'
import { useCurrent } from '@/hooks/useCurrent'
import {
	changeNotificationsSettingsSchema,
	type ChangeNotificationsSettingsSchemaType
} from '@/schemas/user/change-notifications-settings.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

export function ChangeNotificationsSettingsForm() {
	const t = useTranslations('dashboard.settings.notifications')

	const { user, isLoadingProfile, refetch } = useCurrent()

	const form = useForm<ChangeNotificationsSettingsSchemaType>({
		resolver: zodResolver(changeNotificationsSettingsSchema),
		defaultValues: {
			siteNotifications:
				user?.notificationSettings.siteNotifications ?? false,
			telegramNotifications:
				user?.notificationSettings.telegramNotifications ?? false
		}
	})

	const [update, { loading: isLoadingUpdate }] =
		useChangeNotificationsSettingsMutation({
			onCompleted: data => {
				refetch()
				toast.add({
					type: 'success',
					description: t('successMessage')
				})

				if (data.changeNotificationSettings.telegramAuthToken) {
					window.open(
						`https://t.me/nestjs_teastream_bot?start=${data.changeNotificationSettings.telegramAuthToken}`,
						'_blank'
					)
				}
			},
			onError: () => {
				toast.add({
					type: 'error',
					description: t('errorMessage')
				})
			}
		})

	function onChange() {
		update({
			variables: {
				data: { ...form.getValues() }
			}
		})
	}

	if (isLoadingProfile) {
		return Array.from({ length: 2 }).map((_, index) => (
			<ToggleCardSkeleton key={index} />
		))
	}

	return (
		<FormProvider {...form}>
			<form className='flex flex-col gap-6'>
				<ToggleCard
					name='siteNotifications'
					heading={t('siteNotifications.heading')}
					description={t('siteNotifications.description')}
					onChange={onChange}
					isDisabled={isLoadingUpdate}
				/>
				<ToggleCard
					name='telegramNotifications'
					heading={t('telegramNotifications.heading')}
					description={t('telegramNotifications.description')}
					onChange={onChange}
					isDisabled={isLoadingUpdate}
				/>
			</form>
		</FormProvider>
	)
}
