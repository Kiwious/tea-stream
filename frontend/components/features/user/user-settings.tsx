import { useTranslations } from 'next-intl'

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/common/tabs'
import { Heading } from '@/components/ui/elements/heading'

import { ChangeEmailForm } from './account/change-email-form'
import { ChangePasswordForm } from './account/change-password-form'
import { DeactivateCard } from './account/deactivate-card'
import { WrapperTotp } from './account/totp/wrapper-totp'
import { ChangeColorForm } from './appearance/change-color-form'
import { ChangeLanguageForm } from './appearance/change-language-form'
import { ChangeThemeForm } from './appearance/change-theme-form'
import { ChangeNotificationsSettingsForm } from './notifications/change-notifications-settings-form'
import { ChangeAvatarForm } from './profile/change-avatar-form'
import { ChangeInfoForm } from './profile/change-info-form'
import { SocialLinksForm } from './profile/social-links-form/social-links-form'
import { SessionsList } from './sessions/sessions-list'

export function UserSettings() {
	const t = useTranslations('dashboard.settings')
	return (
		<div className='lg:px-10'>
			<Heading
				title={t('header.heading')}
				description={t('header.description')}
				size='lg'
			/>
			<Tabs defaultValue='profile' className='mt-3 w-full'>
				<TabsList className='grid max-w-2xl grid-cols-5'>
					<TabsTrigger value='profile'>
						{t('header.profile')}
					</TabsTrigger>
					<TabsTrigger value='account'>
						{t('header.account')}
					</TabsTrigger>
					<TabsTrigger value='appearance'>
						{t('header.appearance')}
					</TabsTrigger>
					<TabsTrigger value='notifications'>
						{t('header.notifications')}
					</TabsTrigger>
					<TabsTrigger value='sessions'>
						{t('header.sessions')}
					</TabsTrigger>
				</TabsList>
				<TabsContent value='profile'>
					<div className='mt-5 space-y-6'>
						<Heading
							title={t('profile.header.heading')}
							description={t('profile.header.description')}
						/>
						<ChangeAvatarForm />
						<ChangeInfoForm />
						<SocialLinksForm />
					</div>
				</TabsContent>
				<TabsContent value='account'>
					<div className='mt-5 space-y-6'>
						<Heading
							title={t('account.header.heading')}
							description={t('account.header.description')}
						/>
						<ChangeEmailForm />
						<ChangePasswordForm />
						<Heading
							title={t('account.header.securityHeading')}
							description={t(
								'account.header.securityDescription'
							)}
						/>
						<WrapperTotp />
						<Heading
							title={t('account.header.deactivationHeading')}
							description={t(
								'account.header.deactivationDescription'
							)}
						/>
						<DeactivateCard />
					</div>
				</TabsContent>
				<TabsContent value='appearance'>
					<div className='mt-5 space-y-6'>
						<Heading
							title={t('appearance.header.heading')}
							description={t('appearance.header.description')}
						/>
						<ChangeThemeForm />
						<ChangeLanguageForm />
						<ChangeColorForm />
					</div>
				</TabsContent>
				<TabsContent value='notifications'>
					<div className='mt-5 space-y-6'>
						<Heading
							title={t('notifications.header.heading')}
							description={t('notifications.header.description')}
						/>
						<ChangeNotificationsSettingsForm />
					</div>
				</TabsContent>
				<TabsContent value='sessions'>
					<div className='mt-5 space-y-6'>
						<Heading
							title={t('sessions.header.heading')}
							description={t('sessions.header.description')}
						/>
						<SessionsList />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}
