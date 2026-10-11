import { TransactionsTable } from '@/components/features/sponsorship/transaction/table/transactions-table'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('dashboard.transactions.header')

	return {
		title: t('heading'),
		description: t('description'),
		robots: {
			index: false,
			follow: false
		}
	}
}

export default function TransactionsPage() {
	return <TransactionsTable />
}
