import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import { PropsWithChildren } from 'react'

const headingSizes = cva('', {
	variants: {
		size: {
			sm: 'text-lg',
			default: 'text-2xl',
			lg: 'text-4xl',
			xl: 'text-5xl'
		}
	},
	defaultVariants: {
		size: 'default'
	}
})

interface Props extends VariantProps<typeof headingSizes> {
	description?: string
}

export function Heading({
	children,
	size,
	description
}: PropsWithChildren<Props>) {
	return (
		<div className='space-y-2'>
			<h1
				className={cn(
					'text-foreground font-semibold',
					headingSizes({ size })
				)}
			>
				{children}
			</h1>
			{description && (
				<p className='text-muted-foreground'>{description}</p>
			)}
		</div>
	)
}
