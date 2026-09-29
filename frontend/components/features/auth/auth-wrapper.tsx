import { Button } from '@/components/ui/common/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/common/card'
import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

interface Props {
	heading: string
	backButtonLabel?: string
	backButtonHref?: string
}

export function AuthWrapper({
	children,
	heading,
	backButtonHref,
	backButtonLabel
}: PropsWithChildren<Props>) {
	return (
		<div className='flex h-full items-center justify-center'>
			<Card className='w-112.5'>
				<CardHeader className='flex flex-row items-center justify-center gap-x-4'>
					<Image
						src='/images/logo.svg'
						alt='TeaStream'
						width={40}
						height={40}
					/>
					<CardTitle>{heading}</CardTitle>
				</CardHeader>
				<CardContent>{children}</CardContent>
				<CardFooter className='-mt-2'>
					{backButtonHref && backButtonLabel && (
						<Button variant='ghost' className='w-full'>
							<Link href={backButtonHref}>{backButtonLabel}</Link>
						</Button>
					)}
				</CardFooter>
			</Card>
		</div>
	)
}
