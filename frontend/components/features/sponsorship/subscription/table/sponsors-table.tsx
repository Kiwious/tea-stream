'use client'

import { Button } from '@/components/ui/common/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/common/dropdown-menu'
import { ChannelAvatar } from '@/components/ui/elements/channel-avatar'
import { ChannelVerified } from '@/components/ui/elements/channel-verified'
import {
	DataTable,
	DataTableSkeleton
} from '@/components/ui/elements/data-table'
import type { DataTableFeatures } from '@/components/ui/elements/data-table-features'
import { Heading } from '@/components/ui/elements/heading'
import {
	type FindMySponsorsQuery,
	useFindMySponsorsQuery
} from '@/graphql/generated/output'
import { formatDate } from '@/utils/formatDate'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, User } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

export function SponsorsTable() {
	const t = useTranslations('dashboard.sponsors')

	const locale = useLocale()

	const { data, loading: isLoadingSponsors } = useFindMySponsorsQuery()
	const followers = data?.findMySponsors ?? []

	const sponsorsColumns: ColumnDef<
		DataTableFeatures,
		FindMySponsorsQuery['findMySponsors'][0]
	>[] = [
		{
			accessorKey: 'expiresAt',
			header: t('columns.date'),
			cell: ({ row }) =>
				formatDate(row.original.expiresAt as string, locale)
		},
		{
			accessorKey: 'user',
			header: t('columns.user'),
			cell: ({ row }) => (
				<div className='flex items-center gap-x-2'>
					<ChannelAvatar channel={row.original.user} size='sm' />
					<h2>{row.original.user.username}</h2>
					{row.original.user.isVerified && (
						<ChannelVerified size='sm' />
					)}
				</div>
			)
		},
		{
			accessorKey: 'sponsorshipPlan',
			header: t('columns.plan'),
			cell: ({ row }) => row.original.sponsorshipPlan.title
		},
		{
			accessorKey: 'actions',
			header: t('columns.actions'),
			cell: ({ row }) => (
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button variant='ghost' className='size-8 p-0'>
								<MoreHorizontal className='size-4' />
							</Button>
						}
					/>
					<DropdownMenuContent side='right'>
						<Link
							href={`/${row.original.user.username}`}
							target='_blank'
						>
							<DropdownMenuItem>
								<User className='mr-2 size-4' />
								{t('columns.viewChannel')}
							</DropdownMenuItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
	]

	return (
		<div className='lg:px-10'>
			<Heading description={t('header.description')} size='lg'>
				{t('header.heading')}
			</Heading>
			<div className='mt-5'>
				{isLoadingSponsors ? (
					<DataTableSkeleton />
				) : (
					<DataTable columns={sponsorsColumns} data={followers} />
				)}
			</div>
		</div>
	)
}
