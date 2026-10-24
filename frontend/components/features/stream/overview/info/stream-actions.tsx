import type { FindChannelByUsernameQuery } from '@/graphql/generated/output'
import { FollowButton } from './follow-button'
import { SupportButton } from './support-button'
import { ShareActions } from './share-actions'
import { Skeleton } from '@/components/ui/common/skeleton'
import { StreamSettings } from '../../settings/stream-settings'

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function StreamActions({ channel }: Props) {
	return (
		<div className='mt-5 flex flex-col items-start gap-4 lg:mt-0 lg:flex-row lg:items-center lg:gap-3'>
			<FollowButton channel={channel} />
			{channel.isVerified && channel.sponsorshipPlans.length > 0 && (
				<SupportButton channel={channel} />
			)}
			<StreamSettings channel={channel} />
			<ShareActions channel={channel} />
		</div>
	)
}

export function StreamActionsSkeleton() {
	return (
		<div className='mt-6 lg:mt-0'>
			<div className='items-center space-y-4 gap-x-4 lg:flex lg:space-y-0'>
				<Skeleton className='h-10 w-44 rounded-full' />
				<Skeleton className='size-10 rounded-full' />
			</div>
		</div>
	)
}
