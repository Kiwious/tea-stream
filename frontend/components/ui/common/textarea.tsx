import * as React from 'react'
import { cn } from 'cn'
import { useController, useFormContext } from 'react-hook-form'
import { Field, FieldLabel } from './field'

interface Props extends React.ComponentProps<'textarea'> {
	name: string
	label: string
	className?: string
}

function Textarea({ className, label, ...props }: Props) {
	const { control } = useFormContext()
	const { field } = useController({ name: props.name, control })
	return (
		<Field>
			<FieldLabel>{label}</FieldLabel>
			<textarea
				{...field}
				data-slot='textarea'
				className={cn(
					'border-border placeholder:text-muted-foreground disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 focus:border-primary flex field-sizing-content max-h-[80px] min-h-[80px] w-full rounded-lg border bg-transparent px-2.5 py-2 text-sm transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3',
					className
				)}
				{...props}
			/>
		</Field>
	)
}

export { Textarea }
