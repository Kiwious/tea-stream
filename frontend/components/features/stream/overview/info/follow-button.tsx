'use client'

import { Button } from '@/components/ui/common/button'
import { toast } from '@/components/ui/common/toast'
import { ConfirmModal } from '@/components/ui/elements/confirm-modal'
import {
	useFindMyFollowingsQuery,
	useFollowChannelMutation,
	useUnfollowChannelMutation,
	type FindChannelByUsernameQuery
} from '@/graphql/generated/output'
import { useAuth } from '@/hooks/useAuth'
import { useCurrent } from '@/hooks/useCurrent'
import { Heart, HeartOff } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function FollowButton({ channel }: Props) {
	const t = useTranslations('stream.actions.follow')
	const router = useRouter()

	const { isAuthenticated } = useAuth()
	const { user, isLoadingProfile } = useCurrent()

	const {
		data,
		loading: isLoadingFollowings,
		refetch
	} = useFindMyFollowingsQuery({
		skip: !isAuthenticated
	})
	const followings = data?.findMyFollowings

	const [follow, { loading: isLoadingFollow }] = useFollowChannelMutation({
		onCompleted: () => {
			refetch()
			toast.add({
				type: 'success',
				description: t('successFollowMessage')
			})
		},
		onError: () => {
			toast.add({
				type: 'errpor',
				description: t('errorFollowMessage')
			})
		}
	})

	const [unfollow, { loading: isLoadingUnfollow }] =
		useUnfollowChannelMutation({
			onCompleted: () => {
				refetch()
				toast.add({
					type: 'success',
					description: t('successUnfollowMessage')
				})
			},
			onError: () => {
				toast.add({
					type: 'errpor',
					description: t('errorUnfollowMessage')
				})
			}
		})

	const isOwnerChannel = user?.id === channel.id
	const isExistingFollow = followings?.some(
		following => following.followingId === channel.id
	)

	function onFollowButtonClick() {
		if (isAuthenticated) {
			follow({ variables: { channelId: channel.id } })
		} else {
			router.push('/account/login')
		}
	}

	function onUnfollowConfirm() {
		unfollow({ variables: { channelId: channel.id } })
	}

	if (isOwnerChannel || isLoadingProfile) {
		return null
	}

	if (isExistingFollow) {
		return (
			<ConfirmModal
				heading={t('confirmUnfollowHeading')}
				message={t('confirmUnfollowMessage')}
				onConfirm={onUnfollowConfirm}
			>
				<Button
					variant='secondary'
					disabled={isLoadingFollowings || isLoadingUnfollow}
				>
					<HeartOff className='size-4' />
					{t('unfollowButton')}
				</Button>
			</ConfirmModal>
		)
	}

	return (
		<Button
			disabled={isLoadingFollowings || isLoadingFollow}
			onClick={onFollowButtonClick}
		>
			<Heart className='size-4' />
			{t('followButton')}
		</Button>
	)
}
