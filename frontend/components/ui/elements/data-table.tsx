'use client'

import { useTable, type ColumnDef, type RowData } from '@tanstack/react-table'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '../common/table'

import { features, type DataTableFeatures } from './data-table-features'
import { useTranslations } from 'next-intl'
import { Skeleton } from '../common/skeleton'
import { Card } from '../common/card'
import { Loader } from 'lucide-react'

interface DataTableProps<TData extends RowData> {
	columns: ColumnDef<DataTableFeatures, TData>[]
	data: TData[]
}

export function DataTable<TData extends RowData>({
	columns,
	data
}: DataTableProps<TData>) {
	const t = useTranslations('components.dataTable')

	const table = useTable({
		features,
		data,
		columns
	})

	return (
		<div className='overflow-hidden rounded-lg border'>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder ? null : (
											<table.FlexRender header={header} />
										)}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map(row => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map(cell => (
									<TableCell key={cell.id}>
										<table.FlexRender cell={cell} />
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className='h-24 text-center'
							>
								{t('notFound')}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}

export function DataTableSkeleton() {
	return (
		<div className='mx-auto mb-10 w-full max-w-screen-2xl'>
			<Card className='mt-6 flex h-[500px] w-full items-center justify-center'>
				<Loader className='text-muted-foreground size-8 animate-spin' />
			</Card>
		</div>
	)
}
