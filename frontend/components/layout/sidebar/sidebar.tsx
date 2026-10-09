'use client'

import { useSidebar } from '@/hooks/useSidebar'
import { cn } from 'cn'
import { SidebarHeader } from './sidebar-header'
import { usePathname } from 'next/navigation'
import { DashboardNav } from './dashboard-nav'
import { UserNav } from './user-nav'

export function Sidebar() {
	const { isCollapsed } = useSidebar()

	const pathname = usePathname()

	const isDashboardPage = pathname.includes('/dashboard')

	return (
		<aside
			className={cn(
				'border-border bg-card fixed left-0 z-50 mt-[75px] flex h-full flex-col border-r transition-all duration-100 ease-in-out',
				isCollapsed ? 'w-16' : 'w-64'
			)}
		>
			<SidebarHeader />
			{isDashboardPage ? <DashboardNav /> : <UserNav />}
		</aside>
	)
}
