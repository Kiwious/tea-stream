import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

const alertVariants = cva(
	'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
	{
		variants: {
			variant: {
				default: 'bg-background text-foreground',
				destructive:
					'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
)

function Alert({
	className,
	variant,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot='alert'
			role='alert'
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	)
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='alert-title'
			className={cn(
				'mb-1 leading-none font-medium tracking-wide',
				className
			)}
			{...props}
		/>
	)
}

function AlertDescription({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='alert-description'
			className={cn(
				'text-muted-foreground mt-2 text-sm [&_p]:leading-relaxed',
				className
			)}
			{...props}
		/>
	)
}

function AlertAction({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='alert-action'
			className={cn('absolute top-2 right-2', className)}
			{...props}
		/>
	)
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
