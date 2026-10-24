'use server'

import { revalidatePath } from 'next/cache'

export async function revalidateChannel(username: string) {
	revalidatePath(`/${username}`)
}
