'use client'

import { useCurrent } from '@/hooks/useCurrent'

export default function Home() {
	const { user, isLoadingProfile } = useCurrent()
	return (
		<div>
			{isLoadingProfile ? (
				<div>Loading...</div>
			) : (
				<div>
					<div>{JSON.stringify(user)}</div>
				</div>
			)}
		</div>
	)
}
