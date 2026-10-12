import type { FindRandomStreamsQuery } from '@/graphql/generated/output'
import Link from 'next/link'
import { StreamThumbnail } from './stream-thumbnail'
import { ChannelAvatar } from '@/components/ui/elements/channel-avatar'
import { ChannelVerified } from '@/components/ui/elements/channel-verified'
import { Skeleton } from '@/components/ui/common/skeleton'

interface Props {
	stream: FindRandomStreamsQuery['findRandomStreams'][0]
}

export function StreamCard({ stream }: Props) {
	return (
		<div className='h-full w-full'>
			<Link href={`/${stream.user.username}`}>
				<StreamThumbnail
					url={stream.thumbnailUrl}
					user={stream.user}
					isLive={stream.isLive}
				/>
				<h2 className='text-foreground hover:text-primary mt-3 truncate text-base font-semibold'>
					{stream.title}
				</h2>
			</Link>
			<div className='mt-3 flex gap-x-3'>
				<ChannelAvatar channel={stream.user} isLive={stream.isLive} />
				<div className='flex flex-col overflow-hidden text-sm'>
					<h2 className='text-foreground flex items-center gap-x-2 font-semibold'>
						{stream.user.username}
						{stream.user.isVerified && (
							<ChannelVerified size='sm' />
						)}
					</h2>
					{stream.category && (
						<Link
							href={`/categories/${stream.category.slug}`}
							className='text-muted-foreground'
						>
							{stream.category.title}
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}

export function StreamCardSkeleton() {
	return (
		<div className='h-full w-full'>
			<Skeleton className='relative aspect-video rounded-xl' />
			<Skeleton className='mt-3 h-4 w-full' />
			<div className='flex gap-x-4'>
				<Skeleton className='mt-3 size-10 rounded-full' />
				<div className='mt-3.5 flex flex-col space-y-2'>
					<Skeleton className='h-3 w-20' />
					<Skeleton className='h-3 w-20' />
				</div>
			</div>
		</div>
	)
}
