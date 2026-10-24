import { Button } from '@/components/ui/common/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/common/card'
import { CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('success')

	return {
		title: t('heading'),
		...NO_INDEX_PAGE
	}
}

export default async function SuccessPage({
	searchParams
}: {
	searchParams: Promise<{ price: number; username: string; plan: string }>
}) {
	const t = await getTranslations('success')

	const sp = await searchParams

	if (!sp.price || !sp.username) {
		redirect('/')
	}

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<Card className='w-full max-w-2xl'>
				<CardHeader className='text-center'>
					<div className='bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
						<CheckCircle className='text-primary h-10 w-10' />
					</div>
					<CardTitle className='text-3xl font-bold'>
						{t('heading')}
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='bg-muted rounded-lg p-4'>
						<h3 className='mb-2 font-semibold'>
							{t('details.heading')}
						</h3>
						<ul className='space-y-2'>
							<li className='flex items-center'>
								<span>Plan: {sp.plan}</span>
							</li>
							<li className='flex items-center'>
								<span>
									{t('details.price')} {sp.price} EUR
								</span>
							</li>
							<li className='flex items-center'>
								<span>
									{t('details.duration')} 1{' '}
									{t('details.month')}
								</span>
							</li>
							<li className='flex items-center'>
								<span>
									{t('details.channel')} {sp.username}
								</span>
							</li>
						</ul>
					</div>
					<p className='text-muted-foreground text-center'>
						{t('congratulations')}
					</p>
				</CardContent>
				<CardFooter className='flex flex-col space-y-4'>
					<div className='flex gap-x-4'>
						<Link href='/'>
							<Button className='w-full'>
								{t('backToHome')}
							</Button>
						</Link>
						<Link href={`/${sp.username}`}>
							<Button variant='secondary' className='w-full'>
								{t('backToChannel')}
							</Button>
						</Link>
					</div>
					<p className='text-muted-foreground text-center text-sm'>
						{t('support')}
					</p>
				</CardFooter>
			</Card>
		</div>
	)
}
