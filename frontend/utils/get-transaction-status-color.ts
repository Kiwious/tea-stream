import { TransactionStatus } from '@/graphql/generated/output'

export function getTransactionStatusColor(status: TransactionStatus) {
	const colorMap: Record<TransactionStatus, string> = {
		[TransactionStatus.Success]: 'text-green-500',
		[TransactionStatus.Pending]: 'text-yellow-500',
		[TransactionStatus.Failed]: 'text-red-600',
		[TransactionStatus.Expired]: 'text-purple-500'
	}

	const defaultColor = 'text-foreground'

	return colorMap[status] ?? defaultColor
}
