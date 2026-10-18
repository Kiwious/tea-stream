'use client'

import { Smile } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../common/popover'
import { useTranslations } from 'next-intl'
import Picker, { EmojiStyle, type EmojiClickData } from 'emoji-picker-react'
import { useTheme } from 'next-themes'

interface Props {
	onChange: (value: string) => void
	isDisabled: boolean
}

export function EmojiPicker({ isDisabled, onChange }: Props) {
	const t = useTranslations('stream.chat.sendMessage')

	const { theme } = useTheme()

	function onEmojiClick(emoji: EmojiClickData) {
		onChange(emoji.emoji)
	}

	return (
		<Popover>
			<PopoverTrigger
				disabled={isDisabled}
				className='disabled:cursor-not-allowed'
			>
				<Smile className='size-[22px]' />
			</PopoverTrigger>
			<PopoverContent side='top' className='mr-28 mb-4 p-0'>
				<Picker
					onEmojiClick={onEmojiClick}
					emojiStyle={EmojiStyle.APPLE}
					searchPlaceHolder={t('emojiPlaceholder')}
					theme={theme === 'dark' ? 'dark' : 'light'}
				/>
			</PopoverContent>
		</Popover>
	)
}
