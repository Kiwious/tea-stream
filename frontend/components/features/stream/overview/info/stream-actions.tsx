import type { FindChannelByUsernameQuery } from '@/graphql/generated/output'
import { FollowButton } from './follow-button'

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function StreamActions({ channel }: Props) {
	return (
		<div className='mt-5 items-center space-y-4 space-x-3 lg:mt-0 lg:flex lg:space-y-0'>
			<FollowButton channel={channel} />
		</div>
	)
}
