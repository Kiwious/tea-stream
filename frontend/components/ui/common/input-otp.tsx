'use client'

import * as React from 'react'
import { cn } from 'cn'
import { OTPInput, OTPInputContext } from 'input-otp'
import { MinusIcon } from 'lucide-react'
import { useController, useFormContext } from 'react-hook-form'
import { Field, FieldDescription } from './field'
import { Label } from './label'

type InputOTPProps = React.ComponentProps<typeof OTPInput> & {
	name: string
	label?: string
	description?: string
	containerClassName?: string
}

function InputOTP({
	className,
	containerClassName,
	label,
	description,
	...props
}: InputOTPProps) {
	const { control } = useFormContext()
	const { field } = useController({ name: props.name, control })
	return (
		<Field>
			<Label>{label ?? ' '}</Label>
			<OTPInput
				{...field}
				data-slot='input-otp'
				containerClassName={cn(
					'cn-input-otp flex items-center has-disabled:opacity-50',
					containerClassName
				)}
				spellCheck={false}
				className={cn('disabled:cursor-not-allowed', className)}
				{...props}
			/>
			{description && <FieldDescription>{description}</FieldDescription>}
		</Field>
	)
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='input-otp-group'
			className={cn('flex items-center gap-x-3', className)}
			{...props}
		/>
	)
}

function InputOTPSlot({
	index,
	className,
	...props
}: React.ComponentProps<'div'> & {
	index: number
}) {
	const inputOTPContext = React.useContext(OTPInputContext)
	const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

	return (
		<div
			data-slot='input-otp-slot'
			data-active={isActive}
			className={cn(
				'border-border relative flex h-10 w-14 items-center justify-center rounded-md border text-sm transition-all',
				isActive && 'ring-primary ring-offset-background z-10 ring-2',
				className
			)}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
					<div className='animate-caret-blink bg-foreground h-4 w-px duration-1000' />
				</div>
			)}
		</div>
	)
}

function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='input-otp-separator'
			className="flex items-center [&_svg:not([class*='size-'])]:size-4"
			role='separator'
			{...props}
		>
			<MinusIcon />
		</div>
	)
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
