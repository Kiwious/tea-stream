'use client'

import { Button } from '@/components/ui/common/button'
import { Input } from '@/components/ui/common/input'
import { SearchIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { type ChangeEvent, type SubmitEvent, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export function Search() {
	const t = useTranslations('layout.search')

	const [searchTerm, setSearchTerm] = useState('')
	const router = useRouter()

	const form = useForm({
		defaultValues: {
			search: ''
		}
	})

	function onSubmit(event: SubmitEvent) {
		event.preventDefault()

		if (searchTerm.trim()) {
			router.push(`/streams?searchTerm=${searchTerm}`)
		} else {
			router.push('/streams')
		}
	}

	function onChange(event: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
		setSearchTerm(event.target.value)
		console.log(event.target.value)
	}

	return (
		<div className='ml-auto hidden lg:block'>
			<FormProvider {...form}>
				<form
					onSubmit={onSubmit}
					className='relative flex items-center'
				>
					<Input
						name='search'
						type='text'
						placeholder={t('placeholder')}
						value={searchTerm}
						onChange={onChange}
						className='w-full rounded-full pr-10 pl-4 lg:w-[400px]'
					/>
					<Button className='absolute right-0.5 h-9' type='submit'>
						<SearchIcon className='absolute size-[18px]' />
					</Button>
				</form>
			</FormProvider>
		</div>
	)
}
