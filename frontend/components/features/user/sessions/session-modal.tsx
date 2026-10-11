'use client'

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/common/dialog'
import type { FindSessionsByUserQuery } from '@/graphql/generated/output'
import { formatDate } from '@/utils/formatDate'
import { useLocale, useTranslations } from 'next-intl'
import type { ReactElement } from 'react'

import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'

interface Props {
	children: ReactElement
	session: FindSessionsByUserQuery['findSessionsByUser'][0]
}

export function SessionModal({ children, session }: Props) {
	const t = useTranslations('dashboard.settings.sessions.sessionModal')
	const locale = useLocale()

	const center = [
		session.metadata.location.latitude,
		session.metadata.location.longitude
	]

	return (
		<Dialog>
			<DialogTrigger render={children} />
			<DialogContent className='sm:max-w-lg'>
				<DialogTitle className='text-xl'>{t('heading')}</DialogTitle>
				<div className='space-y-3'>
					<div className='flex items-center'>
						<span className='font-medium'>{t('device')}</span>
						<span className='text-muted-foreground ml-2'>
							{session.metadata.device.browser},{' '}
							{session.metadata.device.os}
						</span>
					</div>
					<div className='flex items-center'>
						<span className='font-medium'>{t('location')}</span>
						<span className='text-muted-foreground ml-2'>
							{session.metadata.location.country},{' '}
							{session.metadata.location.city}
						</span>
					</div>
					<div className='flex items-center'>
						<span className='font-medium'>{t('ipAddress')}</span>
						<span className='text-muted-foreground ml-2'>
							{session.metadata.ip}
						</span>
					</div>
					<div className='flex items-center'>
						<span className='font-medium'>{t('createdAt')}</span>
						<span className='text-muted-foreground ml-2'>
							{formatDate(session.createdAt, locale, true)}
						</span>
					</div>
					<YMaps>
						<div className='h-75 w-full overflow-hidden rounded-lg'>
							<Map
								defaultState={{
									center,
									zoom: 11
								}}
								width='100%'
								height='100%'
							>
								<Placemark geometry={center} />
							</Map>
						</div>
					</YMaps>
				</div>
			</DialogContent>
		</Dialog>
	)
}
