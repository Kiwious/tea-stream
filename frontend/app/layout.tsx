import type { Metadata } from 'next'
import { ApolloClientProvider } from '@/providers/apollo-client-provider'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Geist } from 'next/font/google'
import { cn } from 'cn'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from '@/components/ui/common/toast'

import '../styles/themes.css'
import '../styles/globals.css'
import { ColorSwitcher } from '@/components/ui/elements/color-switcher'
import {
	SITE_DESCRIPTION,
	SITE_EMAILS,
	SITE_KEYWORDS,
	SITE_NAME
} from '@/libs/constants/seo.constants'
import { APP_URL } from '@/libs/constants/url.constants'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s - ${SITE_NAME}`
	},
	description: SITE_DESCRIPTION,
	metadataBase: new URL(APP_URL),
	applicationName: SITE_NAME,
	authors: [
		{
			name: 'Kevin',
			url: new URL('https://github.com/Kiwious')
		}
	],
	keywords: SITE_KEYWORDS,
	generator: 'Next.js',
	creator: 'Kevin',
	publisher: 'Kiwicord Inc.',
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
		apple: '/touch-icons/256x256.png',
		other: {
			rel: 'touch-icons',
			url: '/touch-icons/256x256.png',
			sizes: '256x256',
			type: 'image/png'
		}
	},
	openGraph: {
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
		type: 'website',
		emails: SITE_EMAILS,
		locale: 'en_EN',
		images: [
			{
				url: '/touch-icons/512x512.png',
				width: 512,
				height: 512,
				alt: SITE_NAME
			}
		],
		url: new URL(APP_URL)
	},
	twitter: {
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
		images: [
			{
				url: '/touch-icons/512x512.png',
				width: 512,
				height: 512,
				alt: SITE_NAME
			}
		]
	}
}

export default async function RootLayout({ children }: LayoutProps<'/'>) {
	const locale = await getLocale()
	const messages = await getMessages()
	return (
		<html
			lang={locale}
			className={cn('font-sans', geist.variable)}
			suppressHydrationWarning
		>
			<body>
				<ColorSwitcher />
				<ApolloClientProvider>
					<NextIntlClientProvider messages={messages}>
						<ThemeProvider
							attribute='class'
							defaultTheme='dark'
							disableTransitionOnChange
						>
							<Toaster />
							{children}
						</ThemeProvider>
					</NextIntlClientProvider>
				</ApolloClientProvider>
			</body>
		</html>
	)
}
