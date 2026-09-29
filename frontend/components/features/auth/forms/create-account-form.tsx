'use client'

import { AuthWrapper } from '../auth-wrapper'

export function CreateAccountForm() {
	return (
		<AuthWrapper
			heading='Register on TeaStream'
			backButtonLabel='Already have an account? Login'
			backButtonHref='/account/login'
		>
			CreateAccountForm
		</AuthWrapper>
	)
}
