import type { ReactElement } from 'react'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '../common/tooltip'

interface Props {
	children: ReactElement
	label: string
	side?: 'top' | 'bottom' | 'left' | 'right'
	align?: 'start' | 'center' | 'end'
}

export function Hint({ children, label, align, side }: Props) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger render={children} />
				<TooltipContent
					className='bg-[#1f2128] text-white dark:bg-white dark:text-[#1f2128]'
					side={side}
					align={align}
				>
					<p className='font-semibold'>{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
