import { Input as InputPrimitive } from '@base-ui/react/input'
import { cn } from 'cn'
import type { ComponentProps, ReactNode } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { Field, FieldDescription } from './field'
import { Label } from './label'

type InputProps = ComponentProps<'input'> &
	Required<Pick<ComponentProps<'input'>, 'name'>>

interface Props extends InputProps {
	label?: string | ReactNode
	description?: string
}

function Input({ className, type, label, description, ...props }: Props) {
	const { control } = useFormContext()
	const { field } = useController({ name: props.name, control })
	return (
		<Field>
			{label && <Label>{label}</Label>}
			<InputPrimitive
				{...field}
				type={type}
				data-slot='input'
        // placeholder=''
				className={cn(
					'border-border bg-input file:text-foreground placeholder:text-muted-foreground focus:border-primary flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				{...props}
			/>
			{description && <FieldDescription>{description}</FieldDescription>}
		</Field>
	)
}

export { Input }
