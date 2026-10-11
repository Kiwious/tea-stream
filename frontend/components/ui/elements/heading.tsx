import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

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
	title: string
	description?: string
}

export function Heading({ title, size, description }: Props) {
	return (
		<div className='space-y-2'>
			<h1
				className={cn(
					'text-foreground font-semibold',
					headingSizes({ size })
				)}
			>
				{title}
			</h1>
			{description && (
				<p className='text-muted-foreground'>{description}</p>
			)}
		</div>
	)
}
