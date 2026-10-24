'use client'

import { useFormContext } from 'react-hook-form'
import { type ChangeEvent, useRef } from 'react'
import { Button } from '../common/button'

interface Props {
	name?: string
	label?: string
	mutation: (...args: unknown[]) => void
	disabled?: boolean
}

export function UploadFile({
	name = 'file',
	label = 'Upload file',
	disabled = false,
	mutation
}: Props) {
	const { setValue } = useFormContext()

	const inputRef = useRef<HTMLInputElement>(null)

	function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0]

		if (file) {
			setValue(name, file)
			mutation()
		}
	}

	function onClick() {
		inputRef.current?.click()
	}

	return (
		<>
			<input
				type='file'
				className='hidden'
				ref={inputRef}
				onChange={handleImageChange}
			/>
			<Button
				variant='secondary'
				onClick={onClick}
				disabled={disabled}
			>
				{label}
			</Button>
		</>
	)
}
