'use client'

import { Separator } from '@/components/ui/common/separator'
import {
	useFindNotificationsByUserQuery,
	useFindNotificationsUnreadCountQuery
} from '@/graphql/generated/output'
import { getNotificationIcon } from '@/utils/get-notification-icon'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Fragment, useEffect } from 'react'
import parse from 'html-react-parser'

export function NotificationsList() {
	const t = useTranslations('layout.headerMenu.profileMenu.notifications')
	const { refetch } = useFindNotificationsUnreadCountQuery()
	const { data, loading: isLoadingNotifications } =
		useFindNotificationsByUserQuery()

	useEffect(() => {
		if (data) refetch()
	}, [data, refetch])

	const notifications = data?.findNotificationsByUser ?? []

	return (
		<>
			<h2 className='text-center text-lg font-medium'>{t('heading')}</h2>
			<Separator className='my-3' />
			{isLoadingNotifications ? (
				<div className='text-foreground flex items-center justify-center gap-x-2 text-sm'>
					<Loader2 className='size-5 animate-spin' />
					{t('loading')}
				</div>
			) : notifications.length ? (
				notifications.map((notification, index) => {
					const Icon = getNotificationIcon(notification.type)
					return (
						<Fragment key={notification.id}>
							<div className='flex items-center gap-x-3 text-sm'>
								<div className='bg-foreground rounded-full p-2'>
									<Icon className='text-secondary size-6' />
								</div>
								<div>{parse(notification.message)}</div>
							</div>
							{index < notifications.length - 1 && (
								<Separator className='my-3' />
							)}
						</Fragment>
					)
				})
			) : (
				<div className='text-muted-foreground text-center'>
					{t('empty')}
				</div>
			)}
		</>
	)
}
