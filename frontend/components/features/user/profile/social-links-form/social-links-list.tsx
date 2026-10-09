'use client'

import {
	useFindSocialLinksQuery,
	useReorderSocialLinksMutation
} from '@/graphql/generated/output'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import {
	DragDropContext,
	Draggable,
	Droppable,
	type DropResult
} from '@hello-pangea/dnd'
import { SocialLinkItem } from './social-link-item'
import { toast } from '@/components/ui/common/toast'

export function SocialLinksList() {
	const t = useTranslations('dashboard.settings.profile.socialLinks')

	const { data, refetch } = useFindSocialLinksQuery()
	const items = useMemo(
		() => data?.findSocialLinks ?? [],
		[data?.findSocialLinks]
	)

	const [socialLinks, setSocialLinks] = useState(items)

	useEffect(() => {
		setSocialLinks(items)
	}, [items])

	const [reorder, { loading: isLoadingReorder }] =
		useReorderSocialLinksMutation({
			onCompleted: () => {
				refetch()
				toast.add({
					type: 'success',
					description: t('successReorderMessage')
				})
			},
			onError: () => {
				toast.add({
					type: 'error',
					description: t('errorReorderMessage')
				})
			}
		})

	function onDragEnd(result: DropResult) {
		if (!result.destination) {
			return
		}

		const items = Array.from(socialLinks)
		const [reorderItem] = items.splice(result.source.index, 1)

		items.splice(result.destination.index, 0, reorderItem)

		const bulkUpdateData = items.map((socialLink, index) => ({
			id: socialLink.id,
			position: index
		}))

		setSocialLinks(items)

		reorder({ variables: { list: bulkUpdateData } })
	}

	if (!socialLinks.length) return

	return (
		<div className='mt-5 px-5'>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='socialLinks'>
					{provided => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{socialLinks.map((socialLink, index) => (
								<Draggable
									key={socialLink.id}
									draggableId={socialLink.id}
									index={index}
									isDragDisabled={isLoadingReorder}
								>
									{provided => (
										<SocialLinkItem
											key={index}
											socialLink={socialLink}
											provided={provided}
										/>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div> 
					)}
				</Droppable>
			</DragDropContext>
		</div>
	)
}
