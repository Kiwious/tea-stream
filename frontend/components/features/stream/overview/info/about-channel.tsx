'use client'

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/components/ui/common/card'
import { Skeleton } from '@/components/ui/common/skeleton'
import type { FindChannelByUsernameQuery } from '@/graphql/generated/output'
import { getSocialIcon } from '@/utils/getSocialIcon'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function AboutChannel({ channel }: Props) {
	const t = useTranslations('stream.aboutChannel')

	return (
		<Card className='mt-6'>
			<CardHeader className='p-4'>
				<CardTitle className='text-xl'>
					{t('heading')} {channel.displayName}
				</CardTitle>
			</CardHeader>
			<CardContent className='-mt-1 space-y-2 px-4'>
				<div className='text-foreground text-[15px]'>
					<span className='font-semibold'>
						{channel.followers.length}
					</span>{' '}
					{t('followersCount')}
				</div>
				<div className='text-muted-foreground text-[15px]'>
					{channel.bio ?? t('noDescription')}
				</div>
				{channel.socialLinks.length > 0 && (
					<div className='grid gap-x-3 md:grid-cols-3 xl:grid-cols-8'>
						{channel.socialLinks.map((socialLink, index) => {
							const Icon = getSocialIcon(socialLink.url)

							return (
								<Link
									key={index}
									href={socialLink.url}
									className='hover:text-primary flex items-center pr-1 text-[15px]'
									target='_blank'
								>
									<Icon className='mr-2 size-4' />
									{socialLink.title}
								</Link>
							)
						})}
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export function AboutChannelSkeleton() {
	return <Skeleton className='mt-6 h-36 w-full' />
}
