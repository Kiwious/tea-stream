import { MEDIA_URL } from '@/libs/constants/url.constants'

export function getMediaSource(path: string | undefined | null) {
	if (!path) return undefined

	return `${MEDIA_URL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`
}
