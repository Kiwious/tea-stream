'use client'

import { toast } from '@/components/ui/common/toast'
import { useVerifyAccountMutation } from '@/graphql/generated/output'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { AuthWrapper } from '../auth-wrapper'
import { Loader } from 'lucide-react'

export function VerifyAccountForm() {
	const t = useTranslations('auth.verify')

	const router = useRouter()
	const searchParams = useSearchParams()

	const token = searchParams.get('token') ?? ''

	const [verify] = useVerifyAccountMutation({
		onCompleted: () => {
			toast.add({
				type: 'success',
				description: t('successMessage')
			})
			router.push('/dashboard/settings')
		},
		onError: () => {
			toast.add({
				type: 'error',
				description: t('errorMessage')
			})
		}
	})

	const hasVerified = useRef(false)

	useEffect(() => {
		if (hasVerified.current) return
		hasVerified.current = true

		verify({
			variables: {
				data: {
					token
				}
			}
		})
	}, [token])

	return (
		<AuthWrapper heading={t('heading')}>
			<div className='flex justify-center'>
				<Loader className='size-8 animate-spin' />
			</div>
		</AuthWrapper>
	)
}
