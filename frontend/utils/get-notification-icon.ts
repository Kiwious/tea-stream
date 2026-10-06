import { NotificationType } from '@/graphql/generated/output'
import {
	Bell,
	Check,
	Fingerprint,
	type LucideIcon,
	Medal,
	Radio,
	User
} from 'lucide-react'

export function getNotificationIcon(type: NotificationType) {
	const iconMap: Record<NotificationType, LucideIcon> = {
		[NotificationType.StreamStart]: Radio,
		[NotificationType.NewFollower]: User,
		[NotificationType.NewSponsorship]: Medal,
		[NotificationType.EnableTwoFactor]: Fingerprint,
		[NotificationType.VerifiedChannel]: Check
	} as const

	const defaultIcon = Bell

	return iconMap[type] ?? defaultIcon
}
