import {
	Body,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Section,
	Tailwind,
	Text
} from '@react-email/components'

import type { SessionMetadata } from '@/src/shared/types/session-metadata.types'

interface Props {
	token: string
	metadata: SessionMetadata
}

export function DeactivateTemplate({ metadata, token }: Props) {
	const { device, ip, location } = metadata
	return (
		<Html>
			<Head />
			<Preview>Deactivate account</Preview>
			<Tailwind>
				<Body className='max-w-2xl mx-auto p-6 bg-slate-50'>
					<Section className='text-center mb-8'>
						<Heading className='text-3xl text-black font-bold'>
							Account deactivation request
						</Heading>
						<Text className='text-black text-base mt-2'>
							You requested to deactivate your <b>TeaStream</b>{' '}
							account.
						</Text>
					</Section>

					<Section className='bg-gray-100 rounded-lg p-6 text-center mb-6'>
						<Heading className='text-2xl text-black font-semibold'>
							Confirmation code:
						</Heading>
						<Heading className='text-3xl text-black font-semibold'>
							{token}
						</Heading>
						<Text className='text-black'>
							This code is valid for 5 minutes
						</Text>
					</Section>

					<Section className='bg-gray-100 rounded-lg p-6 mb-6'>
						<Heading className='text-xl font-semibold text-[#18b9ae]'>
							Information about the request:
						</Heading>
						<ul className='list-disc list-inside mt-2 text-black'>
							<li>
								🌍 Location: {location.city} {location.country}
							</li>
							<li>📱 Operating system: {device.os}</li>
							<li>🌐 Browser: {device.browser}</li>
							<li>💻 IP: {ip}</li>
						</ul>
						<Text className='text-gray-600 mt-2'>
							If you didn't initialize this request, please ignore
							this message.
						</Text>
					</Section>

					<Section className='text-center mt-8'>
						<Text className='text-gray-600'>
							If you have any questions or troubles, please don't
							be shy and contact us on this E-Mail{' '}
							<Link
								href='mailto:help@kiwicord.de'
								className='text-[#18b9ae] underline'
							>
								help@kiwicord.de
							</Link>
						</Text>
					</Section>
				</Body>
			</Tailwind>
		</Html>
	)
}
