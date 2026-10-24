import { ResetPasswordForm } from '@/components/features/auth/forms/reset-password-form'
import { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('auth.resetPassword')

	return {
		title: t('heading'),
		...NO_INDEX_PAGE
	}
}

export default function AccountRecoveryPage() {
	return <ResetPasswordForm />
}
