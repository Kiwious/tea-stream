import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import { Check } from 'lucide-react'

const ChannelVerifiedSizes = cva('', {
	variants: {
		size: {
			sm: 'size-3',
			default: 'size-4'
		}
	},
	defaultVariants: {
		size: 'default'
	}
})

export function ChannelVerified({
	size
}: VariantProps<typeof ChannelVerifiedSizes>) {
	return (
		<span
			className={cn(
				'bg-primary flex items-center justify-center rounded-full p-0.5',
				ChannelVerifiedSizes({ size })
			)}
		>
			<Check
				className={cn(
					'stroke-[4px] text-white',
					size === 'sm' ? 'size-2' : 'size-[11px]'
				)}
			/>
		</span>
	)
}
