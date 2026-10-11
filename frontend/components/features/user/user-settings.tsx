import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/common/tabs'
import { Heading } from '@/components/ui/elements/heading'
import { useTranslations } from 'next-intl'
import { ChangeAvatarForm } from './profile/change-avatar-form'
import { ChangeInfoForm } from './profile/change-info-form'
import { SocialLinksForm } from './profile/social-links-form/social-links-form'
import { ChangeEmailForm } from './account/change-email-form'
import { ChangePasswordForm } from './account/change-password-form'
import { WrapperTotp } from './account/totp/wrapper-totp'
import { DeactivateCard } from './account/deactivate-card'
import { ChangeThemeForm } from './appearance/change-theme-form'
import { ChangeLanguageForm } from './appearance/change-language-form'
import { ChangeColorForm } from './appearance/change-color-form'
import { ChangeNotificationsSettingsForm } from './notifications/change-notifications-settings-form'
import { SessionsList } from './sessions/sessions-list'

export function UserSettings() {
	const t = useTranslations('dashboard.settings')
	return (
		<div className='lg:px-10'>
			<Heading description={t('header.description')} size='lg'>
				{t('header.heading')}
			</Heading>
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
						<Heading description={t('profile.header.description')}>
							{t('profile.header.heading')}
						</Heading>
						<ChangeAvatarForm />
						<ChangeInfoForm />
						<SocialLinksForm />
					</div>
				</TabsContent>
				<TabsContent value='account'>
					<div className='mt-5 space-y-6'>
						<Heading description={t('account.header.description')}>
							{t('account.header.heading')}
						</Heading>
						<ChangeEmailForm />
						<ChangePasswordForm />
						<Heading
							description={t(
								'account.header.securityDescription'
							)}
						>
							{t('account.header.securityHeading')}
						</Heading>
						<WrapperTotp />
						<Heading
							description={t(
								'account.header.deactivationDescription'
							)}
						>
							{t('account.header.deactivationHeading')}
						</Heading>
						<DeactivateCard />
					</div>
				</TabsContent>
				<TabsContent value='appearance'>
					<div className='mt-5 space-y-6'>
						<Heading
							description={t('appearance.header.description')}
						>
							{t('appearance.header.heading')}
						</Heading>
						<ChangeThemeForm />
						<ChangeLanguageForm />
						<ChangeColorForm />
					</div>
				</TabsContent>
				<TabsContent value='notifications'>
					<div className='mt-5 space-y-6'>
						<Heading
							description={t('notifications.header.description')}
						>
							{t('notifications.header.heading')}
						</Heading>
						<ChangeNotificationsSettingsForm />
					</div>
				</TabsContent>
				<TabsContent value='sessions'>
					<div className='mt-5 space-y-6'>
						<Heading description={t('sessions.header.description')}>
							{t('sessions.header.heading')}
						</Heading>
						<SessionsList />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}
