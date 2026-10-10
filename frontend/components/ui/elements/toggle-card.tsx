import { PropsWithChildren } from 'react'
import { CardContainer } from './card-container'
import { Switch } from '../common/switch'
import { Skeleton } from '../common/skeleton'

interface Props {
	heading: string
	description: string
	isDisabled?: boolean
	value: boolean
	onChange: (value: boolean) => void
}

export function ToggleCard({
	children,
	description,
	heading,
	onChange,
	value,
	isDisabled
}: PropsWithChildren<Props>) {
	return (
		<CardContainer
			heading={heading}
			description={description}
			rightContent={
				<Switch
					checked={value}
					onCheckedChange={onChange}
					disabled={isDisabled}
				/>
			}
		></CardContainer>
	)
}

export function ToggleCardSkeleton() {
	return <Skeleton className='mt-6 h-20 w-full' />
}
