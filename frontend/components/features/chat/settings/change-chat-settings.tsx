'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

import { toast } from '@/components/ui/common/toast'
import { Heading } from '@/components/ui/elements/heading'
import {
	ToggleCard,
	ToggleCardSkeleton
} from '@/components/ui/elements/toggle-card'

import { useChangeChatSettingsMutation } from '@/graphql/generated/output'

import { useCurrent } from '@/hooks/useCurrent'

import {
	changeChatSettingsSchema,
	type ChangeChatSettingsSchemaType
} from '@/schemas/stream/change-chat-settings.schema'

export function ChangeChatSettings() {
	const t = useTranslations('dashboard.chat')

	const { user, refetch, isLoadingProfile } = useCurrent()

	const form = useForm<ChangeChatSettingsSchemaType>({
		resolver: zodResolver(changeChatSettingsSchema),
		defaultValues: {
			isChatEnabled: user?.stream.isChatEnabled ?? true,
			isChatFollowersOnly: user?.stream.isChatFollowersOnly ?? false,
			isChatPremiumFollowersOnly:
				user?.stream.isChatPremiumFollowersOnly ?? false
		}
	})

	const [update, { loading: isLoadingUpdate }] =
		useChangeChatSettingsMutation({
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

	function onChange() {
		update({
			variables: {
				data: { ...form.getValues() }
			}
		})
	}

	return (
		<div className='lg:px-10'>
			<Heading
				title={t('header.heading')}
				description={t('header.description')}
				size='lg'
			/>
			{isLoadingProfile ? (
				Array.from({ length: 3 }).map((_, index) => (
					<ToggleCardSkeleton key={index} />
				))
			) : (
				<FormProvider {...form}>
					<form className='mt-3 flex flex-col gap-6'>
						<ToggleCard
							name='isChatEnabled'
							heading={t('isChatEnabled.heading')}
							description={t('isChatEnabled.description')}
							onChange={onChange}
							isDisabled={isLoadingUpdate}
						/>
						<ToggleCard
							name='isChatFollowersOnly'
							heading={t('isChatFollowersOnly.heading')}
							description={t('isChatFollowersOnly.description')}
							onChange={onChange}
							isDisabled={isLoadingUpdate}
						/>
						<ToggleCard
							name='isChatPremiumFollowersOnly'
							heading={t('isChatPremiumFollowersOnly.heading')}
							description={t(
								'isChatPremiumFollowersOnly.description'
							)}
							onChange={onChange}
							isDisabled={isLoadingUpdate}
						/>
					</form>
				</FormProvider>
			)}
		</div>
	)
}
