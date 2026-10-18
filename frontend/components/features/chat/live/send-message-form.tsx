'use client'

import { Button } from '@/components/ui/common/button'
import { Textarea } from '@/components/ui/common/textarea'
import { toast } from '@/components/ui/common/toast'
import { EmojiPicker } from '@/components/ui/elements/emoji-picker'
import {
	useSendChatMessageMutation,
	type FindChannelByUsernameQuery
} from '@/graphql/generated/output'
import {
	sendMessageSchema,
	type SendMessageSchemaType
} from '@/schemas/chat/send-message.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SendHorizonal } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { InputEvent, KeyboardEvent } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
	isDisabled: boolean
}

export function SendMessageForm({ channel, isDisabled }: Props) {
	const t = useTranslations('stream.chat.sendMessage')

	const form = useForm<SendMessageSchemaType>({
		resolver: zodResolver(sendMessageSchema),
		defaultValues: {
			text: ''
		}
	})

	const [sendMessage, { loading: isLoadingMessage }] =
		useSendChatMessageMutation({
			onError: () => {
				toast.add({
					type: 'error',
					description: t('errorMessage')
				})
			}
		})

	const { isValid } = form.formState

	function onSubmit(data: SendMessageSchemaType) {
		sendMessage({
			variables: {
				data: {
					streamId: channel.stream.id,
					text: data.text
				}
			}
		})
		form.reset()
	}

	function onInput(e: InputEvent<HTMLTextAreaElement>) {
		e.currentTarget.style.height = 'auto'
		e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
	}

	function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			form.handleSubmit(onSubmit)()
		}
	}

	function onChangeEmoji(emoji: string) {
		form.setValue('text', `${form.getValues().text}${emoji}`)
	}

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mt-3 flex items-center gap-x-4'
			>
				<div className='relative flex-1'>
					<Textarea
						name='text'
						placeholder={t('placeholder')}
						className='min-h-[40px] resize-none pr-8'
						rows={1}
						onInput={onInput}
						onKeyDown={onKeyDown}
						disabled={isDisabled || isLoadingMessage}
					/>
					<div className='absolute top-2 right-2 cursor-pointer'>
						<EmojiPicker
							isDisabled={isDisabled || isLoadingMessage}
							onChange={onChangeEmoji}
						/>
					</div>
				</div>
				<Button
					size='lgIcon'
					type='submit'
					disabled={isDisabled || !isValid || isLoadingMessage}
				>
					<SendHorizonal className='size-4' />
				</Button>
			</form>
		</FormProvider>
	)
}
