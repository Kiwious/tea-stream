import { Heading } from '@/components/ui/elements/heading'
import type { FindRandomStreamsQuery } from '@/graphql/generated/output'
import { StreamCard } from './stream-card'
import { EmptyState } from '@/components/ui/elements/empty-state'

interface Props {
	heading?: string
	streams: FindRandomStreamsQuery['findRandomStreams']
}

export function StreamsList({ streams, heading }: Props) {
	if (!streams.length) {
		return <EmptyState />
	}

	return (
		<>
			{heading && <Heading title={heading} />}
			<div className='mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
				{streams.map((stream, index) => (
					<StreamCard stream={stream} key={index} />
				))}
			</div>
		</>
	)
}
