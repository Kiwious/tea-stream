'use client'

import {
	DataTable,
	DataTableSkeleton
} from '@/components/ui/elements/data-table'
import type { DataTableFeatures } from '@/components/ui/elements/data-table-features'
import { Heading } from '@/components/ui/elements/heading'
import {
	type FindMyTransactionsQuery,
	useFindMyTransactionsQuery
} from '@/graphql/generated/output'
import { convertPrice } from '@/utils/convert-price'
import { formatDate } from '@/utils/formatDate'
import { getTransactionStatusColor } from '@/utils/get-transaction-status-color'
import type { ColumnDef } from '@tanstack/react-table'
import { useLocale, useTranslations } from 'next-intl'

export function TransactionsTable() {
	const t = useTranslations('dashboard.transactions')

	const { data, loading: isLoadingTransactions } =
		useFindMyTransactionsQuery()
	const transactions = data?.findMyTransactions ?? []

	const locale = useLocale()

	const transactionsColumns: ColumnDef<
		DataTableFeatures,
		FindMyTransactionsQuery['findMyTransactions'][0]
	>[] = [
		{
			accessorKey: 'createdAt',
			header: t('columns.date'),
			cell: ({ row }) =>
				formatDate(row.original.createdAt as string, locale)
		},
		{
			accessorKey: 'status',
			header: t('columns.status'),
			cell: ({ row }) => {
				const status = row.original.status
				const statusColor = getTransactionStatusColor(status)
				return (
					<div className={`py-1.5 ${statusColor}`}>
						{t(`columns.${status.toString().toLowerCase()}`) ??
							status}
					</div>
				)
			}
		},
		{
			accessorKey: 'amount',
			header: t('columns.amount'),
			cell: ({ row }) => convertPrice(row.original.amount)
		}
	]
	return (
		<div className='lg:px-10'>
			<Heading
				title={t('header.heading')}
				description={t('header.description')}
			/>
			<div className='mt-5'>
				{isLoadingTransactions ? (
					<DataTableSkeleton />
				) : (
					<DataTable
						columns={transactionsColumns}
						data={transactions}
					/>
				)}
			</div>
		</div>
	)
}
