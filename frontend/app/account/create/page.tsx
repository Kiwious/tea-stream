import { CreateAccountForm } from '@/components/features/auth/forms/create-account-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Create Account'
}

export default function CreateAccountPage() {
	return <CreateAccountForm />
}
