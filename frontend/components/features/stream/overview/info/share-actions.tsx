'use client'

import { Button } from '@/components/ui/common/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/common/popover'
import type { FindChannelByUsernameQuery } from '@/graphql/generated/output'
import { Share2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FaReddit, FaTelegram, FaVk } from 'react-icons/fa'
import {
	RedditShareButton,
	TelegramShareButton,
	VKShareButton,
	XShareButton
} from 'react-share'
import { FaXTwitter } from 'react-icons/fa6'

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function ShareActions({ channel }: Props) {
	const t = useTranslations('stream.actions.share')

	const shareUrl = `${window.location.origin}/${channel.username}`

	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button variant='ghost' size='lgIcon'>
						<Share2 className='size-5' />
					</Button>
				}
			/>
			<PopoverContent side='top' className='w-[300px]'>
				<h2 className='font-medium'>{t('heading')}</h2>
				<div className='mt-4 grid grid-cols-4 gap-3'>
					<TelegramShareButton url={shareUrl}>
						<div className='flex size-14 items-center justify-center rounded-md bg-sky-500 transition-transform hover:-translate-y-1.5'>
							<FaTelegram className='size-7 text-white' />
						</div>
					</TelegramShareButton>
					<XShareButton url={shareUrl}>
						<div className='flex size-14 items-center justify-center rounded-md bg-black transition-transform hover:-translate-y-1.5'>
							<FaXTwitter className='size-7 text-white' />
						</div>
					</XShareButton>
					<VKShareButton url={shareUrl}>
						<div className='flex size-14 items-center justify-center rounded-md bg-sky-700 transition-transform hover:-translate-y-1.5'>
							<FaVk className='size-7 text-white' />
						</div>
					</VKShareButton>
					<RedditShareButton url={shareUrl}>
						<div className='flex size-14 items-center justify-center rounded-md bg-orange-600 transition-transform hover:-translate-y-1.5'>
							<FaReddit className='size-7 text-white' />
						</div>
					</RedditShareButton>
				</div>
			</PopoverContent>
		</Popover>
	)
}
