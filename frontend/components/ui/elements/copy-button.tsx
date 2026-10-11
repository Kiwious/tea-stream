'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from '../common/toast'
import { Check, Copy } from 'lucide-react'
import { Button } from '../common/button'

interface Props {
	value: string | null | undefined
}

export function CopyButton({ value }: Props) {
	const t = useTranslations('components.copyButton')

	const [isCopied, setIsCopied] = useState(false)

	function onCopy() {
		if (!value) return

		setIsCopied(true)
		navigator.clipboard.writeText(value)
		toast.add({
			type: 'success',
			description: t('successMessage')
		})
		setTimeout(() => {
			setIsCopied(false)
		}, 2000)
	}

	const Icon = isCopied ? Check : Copy

	return (
		<Button
			variant='ghost'
			size='lgIcon'
			onClick={onCopy}
			disabled={!value || isCopied}
		>
			<Icon className='size-5' />
		</Button>
	)
}
