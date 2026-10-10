import { FindProfileQuery } from '@/graphql/generated/output'
import { cva, type VariantProps } from 'class-variance-authority'
import { Avatar, AvatarFallback, AvatarImage } from '../common/avatar'
import { cn } from 'cn'
import { getMediaSource } from '@/utils/get-media-source'

const avatarSizes = cva('', {
	variants: {
		size: {
			sm: 'size-7',
			default: 'size-9',
			lg: 'size-14',
			xl: 'size-32'
		}
	},
	defaultVariants: {
		size: 'default'
	}
})

interface Props extends VariantProps<typeof avatarSizes> {
	channel: Partial<
		Pick<FindProfileQuery['findProfile'], 'username' | 'avatar'>
	>
	isLive?: boolean
}

export function ChannelAvatar({ size, channel, isLive = false }: Props) {
	return (
		<div className='relative'>
			<Avatar
				className={cn(
					avatarSizes({ size }),
					isLive && 'ring-2 ring-rose-500'
				)}
			>
				<AvatarImage
					src={getMediaSource(channel.avatar)}
					className='object-cover'
				/>
				<AvatarFallback className={cn(size === 'xl' && 'text-4xl')}>
					{channel.username?.at(0)?.toUpperCase()}
				</AvatarFallback>
			</Avatar>
		</div>
	)
}
