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
		if (error) {
			if (isAuthenticated) {
				clearCookie()
			}
			exit()
		}
	}, [clearCookie, exit, isAuthenticated])

	return {
		user: data?.findProfile,
		isLoadingProfile: loading,
		refetch
	}
}
