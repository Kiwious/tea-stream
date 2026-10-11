import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./libs/i18n/request.ts')

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pub-4b276bee3dae40ea857904db746420d6.r2.dev'
			}
		]
	}
}

export default withNextIntl(nextConfig)
