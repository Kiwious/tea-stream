import { PropsWithChildren } from 'react'
import { CardContainer } from './card-container'
import { Switch } from '../common/switch'
import { Skeleton } from '../common/skeleton'

interface Props {
	name: string
	heading: string
	description: string
	isDisabled?: boolean
	onChange?: (value: boolean) => void
}

export function ToggleCard({
	children,
	name,
	description,
	heading,
	onChange,
	isDisabled
}: PropsWithChildren<Props>) {
	return (
		<CardContainer
			heading={heading}
			description={description}
			rightContent={
				<Switch
					name={name}
					onChange={onChange}
					disabled={isDisabled}
				/>
			}
		></CardContainer>
	)
}

export function ToggleCardSkeleton() {
	return <Skeleton className='mt-6 h-20 w-full' />
}
