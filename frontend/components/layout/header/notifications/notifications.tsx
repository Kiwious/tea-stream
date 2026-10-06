'use client'

import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/common/popover'
import { useFindNotificationsUnreadCountQuery } from '@/graphql/generated/output'
import { Bell } from 'lucide-react'
import { NotificationsList } from './notifications-list'

export function Notifications() {
	const { data, loading: isLoadingCount } =
		useFindNotificationsUnreadCountQuery()

	const count = data?.findNotificationsUnreadCount ?? 0

	const displayCount = count > 10 ? '9+' : count

	if (isLoadingCount) return null

	return (
		<Popover>
			<PopoverTrigger>
				{count !== 0 && (
					<div className='bg-primary absolute top-5 right-[72px] rounded-full px-[5px] text-xs font-semibold text-white'>
						{displayCount}
					</div>
				)}
				<Bell className='text-foreground size-5' />
			</PopoverTrigger>
			<PopoverContent
				align='end'
				className='max-h-[500px] w-[320px] overflow-y-auto'
			>
				<NotificationsList />
			</PopoverContent>
		</Popover>
	)
}
