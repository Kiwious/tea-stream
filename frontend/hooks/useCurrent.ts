import { CombinedGraphQLErrors } from '@apollo/client/errors'
import {
	useClearSessionCookieMutation,
	useFindProfileQuery
} from '@/graphql/generated/output'
import { useAuth } from './useAuth'
import { useEffect } from 'react'

export function useCurrent() {
	const { isAuthenticated, exit } = useAuth()

	const { data, loading, refetch, error } = useFindProfileQuery({
		skip: !isAuthenticated
	})

	const [clearCookie] = useClearSessionCookieMutation()

	useEffect(() => {
		if (!error) return

		const isUnauthenticated =
			CombinedGraphQLErrors.is(error) &&
			error.errors.some(e => e.extensions?.code === 'UNAUTHENTICATED')

		if (!isUnauthenticated) {
			console.error('FindProfile failed:', error)
			return
		}

		if (isAuthenticated) {
			clearCookie()
		}
		exit()
	}, [error, clearCookie, exit, isAuthenticated])

	return {
		user: data?.findProfile,
		isLoadingProfile: loading,
		refetch
	}
}
