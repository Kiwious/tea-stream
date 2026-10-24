import { APP_URL } from '@/libs/constants/url.constants'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: '/dashboard/*'
		},
		sitemap: APP_URL + '/sitemap.xml'
	}
}
