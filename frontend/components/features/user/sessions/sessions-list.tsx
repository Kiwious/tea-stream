'use client'

import { Heading } from '@/components/ui/elements/heading'
import { ToggleCardSkeleton } from '@/components/ui/elements/toggle-card'
import {
	type FindSessionsByUserQuery,
	useFindCurrentSessionQuery,
	useFindSessionsByUserQuery
} from '@/graphql/generated/output'
import { useTranslations } from 'next-intl'
import { SessionItem } from './session-item'

export function SessionsList() {
	const t = useTranslations('dashboard.settings.sessions')

	const { data: sessionData, loading: isLoadingCurrent } =
		useFindCurrentSessionQuery()
	const currentSession =
		sessionData?.findCurrentSession ??
		({} as FindSessionsByUserQuery['findSessionsByUser'][0])

	const { data: sessionsData, loading: isLoadingSessions } =
		useFindSessionsByUserQuery()

	const sessions =
		sessionsData?.findSessionsByUser.filter(
			s => s.id !== currentSession.id
		) || []

	return (
		<div className='space-y-6'>
			<Heading size='sm'>{t('info.current')}</Heading>
			{isLoadingCurrent ? (
				<ToggleCardSkeleton />
			) : (
				<SessionItem session={currentSession} isCurrentSession />
			)}
			<Heading size='sm'>{t('info.active')}</Heading>
			{isLoadingSessions ? (
				Array.from({ length: 3 }).map((_, index) => (
					<ToggleCardSkeleton key={index} />
				))
			) : sessions.length ? (
				sessions.map((session, index) => (
					<SessionItem
						key={index}
						session={session}
						isCurrentSession={false}
					/>
				))
			) : (
				<div className='text-muted-foreground'>
					{t('info.notFound')}
				</div>
			)}
		</div>
	)
}
