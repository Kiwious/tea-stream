import type { FindRandomStreamsQuery } from '@/graphql/generated/output'
import Link from 'next/link'
import { StreamThumbnail } from './stream-thumbnail'

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
			</Link>
		</div>
	)
}
