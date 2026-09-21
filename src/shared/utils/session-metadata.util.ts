/* eslint-disable @typescript-eslint/no-require-imports */
import type { Request } from 'express'
import { lookup } from 'geoip-lite'
import * as countries from 'i18n-iso-countries'

import type { SessionMetadata } from '../types/session-metadata.types'

import { IS_DEV_ENV } from './is-dev.util'

import DeviceDetector = require('device-detector-js')

countries.registerLocale(require('i18n-iso-countries/langs/en.json'))

export function getSessionMetadata(
	req: Request,
	userAgent: string
): SessionMetadata {
	const ip = IS_DEV_ENV
		? '79.211.175.60'
		: Array.isArray(req.headers['cf-connecting-ip'])
			? req.headers['cf-connecting-ip'].at(0)
			: req.headers['cf-connecting-ip'] ||
				(typeof req.headers['x-forwarded-for'] === 'string'
					? req.headers['x-forwarded-for'].split(',').at(0)
					: req.ip)

	const resolvedIp = ip ?? '79.211.175.60'
	const location = lookup(resolvedIp)
	const device = new DeviceDetector().parse(userAgent)
	return {
		location: {
			country:
				countries.getName(location?.country || '', 'en') || 'Unknown',
			city: location?.city || 'Unknown',
			latitude: location?.ll[0] || 0,
			longitude: location?.ll[1] || 0
		},
		device: {
			browser: device.client?.name || 'Unknown',
			os: device.os?.name || 'Unknown',
			type: device.device?.type || 'Unknown'
		},
		ip: resolvedIp
	}
}
