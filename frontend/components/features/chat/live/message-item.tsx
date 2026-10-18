import { FindChatMessagesByStreamQuery } from '@/graphql/generated/output'
import { stringToColor } from '@/utils/color'
import { Medal } from 'lucide-react'

interface Props {
	message: FindChatMessagesByStreamQuery['findChatMessagesByStream'][0]
	isSponsor: boolean
}

export function MessageItem({ message, isSponsor }: Props) {
	const color = stringToColor(message.user.username ?? '')

	const formattedTime = new Date(
		message.createdAt as string
	).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit'
	})

	return (
		<div className='hover:bg-accent flex gap-2 rounded-md p-2'>
			<p className='text-muted-foreground text-sm'>{formattedTime}</p>
			<div className='flex grow flex-wrap items-baseline gap-1'>
				<p className='flex items-center text-sm font-semibold whitespace-nowrap'>
					<span
						className='truncate'
						style={{
							color
						}}
					>
						{message.user.username}
					</span>
					{isSponsor && (
						<Medal className='ml-1 size-3.5' style={{ color }} />
					)}
				</p>
				<p className='text-sm break-all'>{message.text}</p>
			</div>
		</div>
	)
}
