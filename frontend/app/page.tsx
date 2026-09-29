'use client'

import { useFindChannelByUsernameQuery } from '@/graphql/generated/output'

export default function Home() {
	const { data, loading } = useFindChannelByUsernameQuery({
		variables: {
			username: 'stintik'
		}
	})
	return <div>{loading ? <div>Loading...</div> : JSON.stringify(data)}</div>
}
