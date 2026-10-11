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
	type FindMyFollowersQuery,
	useFindMyFollowersQuery
} from '@/graphql/generated/output'
import { formatDate } from '@/utils/formatDate'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, User } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

export function FollowersTable() {
	const t = useTranslations('dashboard.followers')

	const locale = useLocale()

	const { data, loading: isLoadingFollowers } = useFindMyFollowersQuery()
	const followers = data?.findMyFollowers ?? []

	const followersColumns: ColumnDef<
		DataTableFeatures,
		FindMyFollowersQuery['findMyFollowers'][0]
	>[] = [
		{
			accessorKey: 'createdAt',
			header: t('columns.date'),
			cell: ({ row }) =>
				formatDate(row.original.createdAt as string, locale)
		},
		{
			accessorKey: 'follower',
			header: t('columns.user'),
			cell: ({ row }) => (
				<div className='flex items-center gap-x-2'>
					<ChannelAvatar channel={row.original.follower} size='sm' />
					<h2>{row.original.follower.username}</h2>
					{row.original.follower.isVerified && (
						<ChannelVerified size='sm' />
					)}
				</div>
			)
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
							href={`/${row.original.follower.username}`}
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
				{isLoadingFollowers ? (
					<DataTableSkeleton />
				) : (
					<DataTable columns={followersColumns} data={followers} />
				)}
			</div>
		</div>
	)
}
