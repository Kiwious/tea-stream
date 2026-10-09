'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/common/dropdown-menu'
import { toast } from '@/components/ui/common/toast'
import { ChannelAvatar } from '@/components/ui/elements/channel-avatar'
import { useLogoutUserMutation } from '@/graphql/generated/output'
import { useAuth } from '@/hooks/useAuth'
import { useCurrent } from '@/hooks/useCurrent'
import { LayoutDashboard, Loader, LogOut, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Notifications } from './notifications/notifications'

export function ProfileMenu() {
	const t = useTranslations('layout.header.headerMenu.profileMenu')
	const router = useRouter()

	const { exit } = useAuth()
	const { user, isLoadingProfile } = useCurrent()

	const [logout] = useLogoutUserMutation({
		onCompleted: () => {
			exit()
			toast.add({
				type: 'success',
				description: t('logoutSuccess')
			})
			router.push('/account/login')
		},
		onError: () => {
			toast.add({
				type: 'error',
				description: t('errorMessage')
			})
		}
	})

	return isLoadingProfile || !user ? (
		<Loader className='text-muted-foreground size-6 animate-spin' />
	) : (
		<>
			<Notifications />
			<DropdownMenu>
				<DropdownMenuTrigger>
					<ChannelAvatar channel={user} />
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end' className='w-[230px]'>
					<div className='flex items-center gap-x-3 p-2'>
						<ChannelAvatar channel={user} />
						<h2 className='text-foreground font-medium'>
							{user.username}
						</h2>
					</div>
					<DropdownMenuSeparator />
					<Link href={`/${user.username}`}>
						<DropdownMenuItem>
							<User className='mr-2 size-4' />
							{t('channel')}
						</DropdownMenuItem>
					</Link>
					<Link href='/dashboard/settings'>
						<DropdownMenuItem>
							<LayoutDashboard className='mr-2 size-4' />
							{t('dashboard')}
						</DropdownMenuItem>
					</Link>
					<DropdownMenuItem onClick={() => logout()}>
						<LogOut className='mr-2 size-4' />
						{t('logout')}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
