import { ApolloClient, InMemoryCache } from '@apollo/client'
import UploadHttpLink from 'apollo-upload-client/UploadHttpLink.mjs'
import { SERVER_URL } from './constants/url.constants'

const httpLink = new UploadHttpLink({
	uri: SERVER_URL,
	credentials: 'include',
	headers: {
		'apollo-require-preflight': 'true'
	}
})

export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
})
