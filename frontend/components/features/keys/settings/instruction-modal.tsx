'use client'

import { Button } from '@/components/ui/common/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/common/dialog'
import { useTranslations } from 'next-intl'

export function InstructionModal() {
	const t = useTranslations('dashboard.keys.instructionModal')

	return (
		<Dialog>
			<DialogTrigger
				render={<Button variant='secondary'>{t('trigger')}</Button>}
			/>
			<DialogContent className='max-h-[80vh] max-w-[800px] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle className='text-xl'>
						{t('heading')}
					</DialogTitle>
					<DialogDescription className='text-muted-foreground text-sm'>
						{t('description')}
					</DialogDescription>
				</DialogHeader>
				<h2 className='text-lg font-semibold'>{t('step1Title')}</h2>
				<p className='text-muted-foreground text-sm'>
					{t('step1Description')}
				</p>

				<ol className='list-inside list-decimal space-y-2 pl-4'>
					<li className='text-muted-foreground text-sm'>
						<strong>{t('downloadObs')}</strong>
						<br />
						{t('downloadObsDescription')}{' '}
						<a
							href='https://obsproject.com'
							className='text-blue-500 underline hover:text-blue-700'
							target='_blank'
							rel='noopener noreferrer'
						>
							{t('obsLinkText')}
						</a>
						.
					</li>
					<li className='text-muted-foreground text-sm'>
						<strong>{t('copyKeys')}</strong>
						<br />
						{t('copyKeysDescription')}
					</li>
				</ol>

				<h2 className='mt-4 text-lg font-semibold'>
					{t('step2Title')}
				</h2>
				<p className='text-muted-foreground text-sm'>
					{t('step2Description')}
				</p>

				<ol className='list-inside list-decimal space-y-2 pl-4'>
					<li className='text-muted-foreground text-sm'>
						<strong>{t('openObs')}</strong>
						<br />
						{t('openObsDescription')}
					</li>
					<li className='text-muted-foreground text-sm'>
						<strong>{t('openStreamSettings')}</strong>
						<br />
						{t('openStreamSettingsDescription')}
					</li>
					<li className='text-muted-foreground text-sm'>
						<strong>{t('enterDetails')}</strong>
						<br />
						{t('enterDetailsDescription')}
					</li>
					<li className='text-muted-foreground text-sm'>
						<strong>{t('saveSettings')}</strong>
						<br />
						{t('saveSettingsDescription')}
					</li>
				</ol>

				<h2 className='mt-4 text-lg font-semibold'>
					{t('step3Title')}
				</h2>
				<p className='text-muted-foreground text-sm'>
					{t('step3Description')}
				</p>

				<ol className='list-inside list-decimal space-y-2 pl-4'>
					<li className='text-muted-foreground text-sm'>
						<strong>{t('startStream')}</strong>
						<br />
						{t('startStreamDescription')}
					</li>
					<li className='text-muted-foreground text-sm'>
						<strong>{t('monitorStream')}</strong>
						<br />
						{t('monitorStreamDescription')}
					</li>
				</ol>

				<p className='text-muted-foreground mt-4 text-sm'>
					{t('congrats')}
				</p>

				<DialogFooter>
					<DialogClose
						render={
							<Button variant='secondary'>{t('close')}</Button>
						}
					/>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
