'use client'

import { useTranslations } from 'next-intl'

import { Heading } from '@/components/ui/elements/heading'
import { ToggleCardSkeleton } from '@/components/ui/elements/toggle-card'

import { useCurrent } from '@/hooks/useCurrent'

import { CreateIngressForm } from './forms/create-ingress-form'
import { StreamKey } from './forms/stream-key'
import { StreamUrl } from './forms/stream-url'
import { InstructionModal } from './instruction-modal'

export function KeysSettings() {
	const t = useTranslations('dashboard.keys.header')

	const { user, isLoadingProfile } = useCurrent()

	return (
		<div className='lg:px-10'>
			<div className='block items-center justify-between space-y-3 lg:flex lg:space-y-0'>
				<Heading
					title={t('heading')}
					description={t('description')}
					size='lg'
				/>
				<div className='flex items-center gap-x-4'>
					<InstructionModal />
					<CreateIngressForm />
				</div>
			</div>
			<div className='mt-5 space-y-6'>
				{isLoadingProfile
					? Array.from({ length: 2 }).map((_, index) => (
							<ToggleCardSkeleton key={index} />
						))
					: user?.stream.serverUrl &&
						user.stream.streamKey && (
							<>
								<StreamUrl value={user?.stream.serverUrl} />
								<StreamKey value={user?.stream.streamKey} />
							</>
						)}
			</div>
		</div>
	)
}
