import { VerifyAccountForm } from '@/components/features/auth/forms/verify-account-form'
import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Title',
	...NO_INDEX_PAGE
}

interface Props {
	searchParams: Promise<{ token: string }>
}

export default async function VerifyAccountPage({ searchParams }: Props) {
	const token = await searchParams

	if (!token.token) {
		return redirect('/account/create')
	}

	return <VerifyAccountForm />
}
