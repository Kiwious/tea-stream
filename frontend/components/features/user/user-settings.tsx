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
				<TabsContent value='account'>account</TabsContent>
				<TabsContent value='appearance'>appearance</TabsContent>
				<TabsContent value='notifications'>notifications</TabsContent>
				<TabsContent value='sessions'>sessions</TabsContent>
			</Tabs>
		</div>
	)
}
