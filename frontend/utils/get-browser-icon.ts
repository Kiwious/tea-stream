import { CircleHelp } from 'lucide-react'
import {
	FaChrome,
	FaEdge,
	FaFirefoxBrowser,
	FaOpera,
	FaSafari,
	FaYandex
} from 'react-icons/fa'

import type { IconType } from 'react-icons'

export function getBrowserIcon(browser: string) {
	const iconMap: Record<string, IconType> = {
		chrome: FaChrome,
		firefox: FaFirefoxBrowser,
		safari: FaSafari,
		edge: FaEdge,
		'microsoft edge': FaEdge,
		opera: FaOpera,
		yandex: FaYandex,
		'yandex browser': FaYandex
	} as const

	const defaultIcon = CircleHelp

	return iconMap[browser.toLowerCase()] ?? defaultIcon
}
