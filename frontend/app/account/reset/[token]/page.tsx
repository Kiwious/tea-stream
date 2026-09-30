import { NewPasswordForm } from '@/components/features/auth/forms/new-password-form'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('auth.newPassword')
	return {
		title: t('heading')
	}
}

export default function ResetPasswordPage() {
	return <NewPasswordForm />
}
