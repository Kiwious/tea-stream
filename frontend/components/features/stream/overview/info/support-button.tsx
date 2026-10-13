'use client'

import { Button } from '@/components/ui/common/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/common/dialog'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/common/tabs'
import { toast } from '@/components/ui/common/toast'
import {
	useFindSponsorsByChannelQuery,
	useMakePaymentMutation,
	type FindChannelByUsernameQuery
} from '@/graphql/generated/output'
import { useAuth } from '@/hooks/useAuth'
import { useCurrent } from '@/hooks/useCurrent'
import { convertPrice } from '@/utils/convert-price'
import { Medal } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function SupportButton({ channel }: Props) {
	const t = useTranslations('stream.actions.support')
	const router = useRouter()

	const { isAuthenticated } = useAuth()
	const { user, isLoadingProfile } = useCurrent()

	const { data } = useFindSponsorsByChannelQuery({
		variables: {
			channelId: channel.id
		}
	})
	const sponsors = data?.findSponsorsByChannel ?? []

	const [makePayment, { loading: isLoadingPayment }] = useMakePaymentMutation(
		{
			onCompleted: data => {
				router.push(data.makePayment.url)
			},
			onError: () => {
				toast.add({
					type: 'error',
					description: t('errorMessage')
				})
			}
		}
	)

	const isSponsor = sponsors.some(sponsor => sponsor.user.id === user?.id)
	const isOwnerChannel = user?.id === channel.id

	function handleMakePayment(planId: string) {
		makePayment({
			variables: {
				planId
			}
		})
	}

	if (isOwnerChannel || isLoadingProfile) {
		return null
	}

	if (isSponsor) {
		return (
			<Button variant='secondary' disabled>
				<Medal className='size-4' />
				{t('alreadySponsor')}
			</Button>
		)
	}

	if (!isAuthenticated) {
		return (
			<Button
				variant='secondary'
				onClick={() => router.push('/account/login')}
			>
				<Medal className='size-4' />
				{t('supportAuthor')}
			</Button>
		)
	}

	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button variant='secondary'>
						<Medal className='size-4' />
						{t('supportAuthor')}
					</Button>
				}
			/>
			<DialogContent>
				<Tabs defaultValue={channel.sponsorshipPlans.at(0)?.id}>
					<TabsList className='mb-1'>
						{channel.sponsorshipPlans.map((plan, index) => (
							<TabsTrigger key={index} value={plan.id}>
								{plan.title}
							</TabsTrigger>
						))}
					</TabsList>
					{channel.sponsorshipPlans.map((plan, index) => (
						<TabsContent key={index} value={plan.id}>
							<DialogTitle className='text-2xl'>
								{convertPrice(plan.price)}
							</DialogTitle>
							{plan.description && (
								<DialogDescription className='mt-2 text-sm'>
									{plan.description}
								</DialogDescription>
							)}
							<Button
								onClick={() => handleMakePayment(plan.id)}
								className='mt-3 w-full'
								disabled={isLoadingPayment}
							>
								{t('choose')}
							</Button>
						</TabsContent>
					))}
				</Tabs>
			</DialogContent>
		</Dialog>
	)
}
