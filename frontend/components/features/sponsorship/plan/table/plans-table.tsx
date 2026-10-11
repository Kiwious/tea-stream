'use client'

import { useLocale, useTranslations } from 'next-intl'

import { Heading } from '@/components/ui/elements/heading'

import { useCurrent } from '@/hooks/useCurrent'

import { CreatePlanForm } from '../forms/create-plan-form'

import { VerifiedChannelAlert } from './verified-channel-alert'
import {
	type FindMySponsorshipPlansQuery,
	useFindMySponsorshipPlansQuery,
	useRemoveSponsorshipPlanMutation
} from '@/graphql/generated/output'
import type { ColumnDef } from '@tanstack/react-table'
import type { DataTableFeatures } from '@/components/ui/elements/data-table-features'
import { formatDate } from '@/utils/formatDate'
import { convertPrice } from '@/utils/convert-price'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/common/dropdown-menu'
import { Button } from '@/components/ui/common/button'
import { toast } from '@/components/ui/common/toast'
import { MoreHorizontal, Trash } from 'lucide-react'
import {
	DataTable,
	DataTableSkeleton
} from '@/components/ui/elements/data-table'

export function PlansTable() {
	const t = useTranslations('dashboard.plans')

	const { user } = useCurrent()

	const {
		data,
		loading: isLoadingPlans,
		refetch
	} = useFindMySponsorshipPlansQuery()
	const plans = data?.findMySponsorshipPlans ?? []

	const [remove, { loading: isLoadingRemove }] =
		useRemoveSponsorshipPlanMutation({
			onCompleted: () => {
				refetch()
				toast.add({
					type: 'success',
					description: t('columns.successMessage')
				})
			},
			onError: () => {
				toast.add({
					type: 'error',
					description: t('columns.errorMessage')
				})
			}
		})

	const locale = useLocale()

	const plansColumns: ColumnDef<
		DataTableFeatures,
		FindMySponsorshipPlansQuery['findMySponsorshipPlans'][0]
	>[] = [
		{
			accessorKey: 'createdAt',
			header: t('columns.date'),
			cell: ({ row }) =>
				formatDate(row.original.createdAt as string, locale)
		},
		{
			accessorKey: 'title',
			header: t('columns.title'),
			cell: ({ row }) => row.original.title
		},
		{
			accessorKey: 'price',
			header: t('columns.price'),
			cell: ({ row }) => convertPrice(row.original.price)
		},
		{
			accessorKey: 'actions',
			header: t('columns.actions'),
			cell: ({ row }) => {
				return (
					<DropdownMenu>
						<DropdownMenuTrigger
							render={
								<Button variant='ghost' className='size-8 p-0'>
									<MoreHorizontal className='size-4' />
								</Button>
							}
						/>
						<DropdownMenuContent side='right'>
							<DropdownMenuItem
								onClick={() =>
									remove({
										variables: { planId: row.original.id }
									})
								}
								variant='destructive'
								disabled={isLoadingRemove}
							>
								<Trash className='mr-2 size-4' />
								{t('columns.remove')}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			}
		}
	]

	if (!user?.isVerified) {
		return <VerifiedChannelAlert />
	}

	return (
		<div className='lg:px-10'>
			<div className='block items-center justify-between space-y-3 lg:flex lg:space-y-0'>
				<Heading
					title={t('header.heading')}
					description={t('header.description')}
				/>
				<CreatePlanForm />
			</div>
			<div className='mt-5'>
				{isLoadingPlans ? (
					<DataTableSkeleton />
				) : (
					<DataTable columns={plansColumns} data={plans} />
				)}
			</div>
		</div>
	)
}
