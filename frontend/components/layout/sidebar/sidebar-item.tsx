'use client'

import { usePathname } from 'next/navigation'
import { Route } from './route.interface'
import { useSidebar } from '@/hooks/useSidebar'
import { Hint } from '@/components/ui/elements/hint'
import { Button } from '@/components/ui/common/button'
import { cn } from 'cn'
import Link from 'next/link'

interface Props {
	route: Route
}

export function SidebarItem({ route }: Props) {
	const pathname = usePathname()
	const { isCollapsed } = useSidebar()

	const isActive = pathname === route.href

	return isCollapsed ? (
		<Hint label={route.label} side='right'>
			<Button
				className={cn(
					'h-11 w-full justify-center',
					isActive && 'bg-accent'
				)}
				variant='ghost'
				nativeButton={false}
				render={<Link href={route.href} />}
			>
				<route.icon className='size-5' />
			</Button>
		</Hint>
	) : (
		<Button
			className={cn(
				'h-11 w-full justify-start gap-x-4',
				isActive && 'bg-accent'
			)}
			variant='ghost'
			nativeButton={false}
			render={<Link href={route.href} />}
		>
			<route.icon className='size-5' />
			{route.label}
		</Button>
	)
}
