import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import { useCurrent } from './useCurrent'
import { useGenerateStreamTokenMutation } from '@/graphql/generated/output'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
import { toast } from '@/components/ui/common/toast'
import { v4 as uuidv4 } from 'uuid'

export function useStreamToken(channelId: string) {
	const [token, setToken] = useState('')
	const [name, setName] = useState('')
	const [identity, setIdentity] = useState('')

	const { isAuthenticated } = useAuth()
	const { user } = useCurrent()

	const [generateStreamToken] = useGenerateStreamTokenMutation({
		onCompleted: data => {
			const viewerToken = data.generateStreamToken.token

			setToken(viewerToken)

			const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
				name?: string
			}

			const name = decodedToken.name
			const identity = decodedToken.jti

			if (name) {
				setName(name)
			}

			if (identity) {
				setIdentity(identity)
			}
		},
		onError: error => {
			toast.add({
				type: 'error',
				description: error.message
			})
		}
	})

	useEffect(() => {
		async function generateToken() {
			const userId = isAuthenticated && user ? user.id : uuidv4()

			await generateStreamToken({
				variables: {
					data: { channelId, userId }
				}
			})
		}

		const timeoutId = setTimeout(generateToken, 1000)

		return () => clearTimeout(timeoutId)
	}, [generateStreamToken, isAuthenticated, user, channelId])

	return { token, name, identity }
}
