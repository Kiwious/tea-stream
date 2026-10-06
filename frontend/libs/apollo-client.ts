import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { SERVER_URL } from './constants/url.constants'

const httpLink = new HttpLink({
	uri: SERVER_URL,
	credentials: 'include'
})

export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
})
