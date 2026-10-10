'use client'

import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { cn } from 'cn'
import { useController, useFormContext } from 'react-hook-form'

interface Props
	extends Omit<
		SwitchPrimitive.Root.Props,
		'name' | 'checked' | 'defaultChecked' | 'onCheckedChange'
	> {
	name: string
	size?: 'sm' | 'default'
	onChange?: (value: boolean) => void
}

function Switch({
	name,
	className,
	size = 'default',
	disabled,
	onChange,
	...props
}: Props) {
	const { control } = useFormContext()
	const { field } = useController({ name, control })

	function handleCheckedChange(value: boolean) {
		field.onChange(value)
		onChange?.(value)
	}

	return (
		<SwitchPrimitive.Root
			data-slot='switch'
			data-size={size}
			className={cn(
				'peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full border px-px shadow-xs transition-colors duration-200 outline-none',
				// Größen
				'data-[size=default]:h-6 data-[size=default]:w-11 data-[size=sm]:h-5 data-[size=sm]:w-9',
				// Zustände
				'data-checked:border-primary data-checked:bg-primary data-unchecked:border-border data-unchecked:bg-muted hover:data-unchecked:bg-muted-foreground/30',
				// Fokus, Fehler, Disabled
				'focus-visible:ring-primary/40 focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2',
				'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50',
				'data-disabled:cursor-not-allowed data-disabled:opacity-50',
				// größere Klickfläche
				'after:absolute after:-inset-x-3 after:-inset-y-2',
				className
			)}
			{...props}
			name={field.name}
			checked={field.value}
			onCheckedChange={handleCheckedChange}
			onBlur={field.onBlur}
			disabled={disabled ?? field.disabled}
			inputRef={field.ref}
		>
			<SwitchPrimitive.Thumb
				data-slot='switch-thumb'
				className={cn(
					'pointer-events-none block rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-out data-unchecked:translate-x-0',
					'group-data-[size=default]/switch:size-5 group-data-[size=default]/switch:data-checked:translate-x-5',
					'group-data-[size=sm]/switch:size-4 group-data-[size=sm]/switch:data-checked:translate-x-4'
				)}
			/>
		</SwitchPrimitive.Root>
	)
}

export { Switch }
