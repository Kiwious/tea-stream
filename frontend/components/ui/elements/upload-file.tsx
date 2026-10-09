'use client'

import { useFormContext } from 'react-hook-form'
import { type ChangeEvent, useRef } from 'react'
import { Button } from '../common/button'

interface Props {
	name: string
	label?: string
	isLoading: boolean
	mutation: (...args: unknown[]) => void
}

export function UploadFile({
	name,
	label = 'Upload file',
	isLoading,
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
		console.log('working')
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
				onClick={() => inputRef.current?.click()}
				disabled={isLoading}
			>
				{label}
			</Button>
		</>
	)
}
