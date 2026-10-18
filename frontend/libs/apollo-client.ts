import { ApolloClient, InMemoryCache, split } from '@apollo/client'
import UploadHttpLink from 'apollo-upload-client/UploadHttpLink.mjs'
import { SERVER_URL, WEBSOCKET_URL } from './constants/url.constants'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = new UploadHttpLink({
	uri: SERVER_URL,
	credentials: 'include',
	headers: {
		'apollo-require-preflight': 'true'
	}
})

const wsLink = new GraphQLWsLink(
	createClient({
		url: WEBSOCKET_URL
	})
)

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query)

		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		)
	},
	wsLink,
	httpLink
)

export const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache()
})
