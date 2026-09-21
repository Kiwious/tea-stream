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
	domain: string
	token: string
	metadata: SessionMetadata
}

export function ResetPasswordTemplate({ domain, metadata, token }: Props) {
	const resetLink = `${domain}/account/reset/${token}`
	const { device, ip, location } = metadata
	return (
		<Html>
			<Head />
			<Preview>Reset password</Preview>
			<Tailwind>
				<Body className='max-w-2xl mx-auto p-6 bg-slate-50'>
					<Section className='text-center mb-8'>
						<Heading className='text-3xl text-black font-bold'>
							Reset password
						</Heading>
						<Text className='text-black text-base mt-2'>
							You requested to reset the password for your
							account.
						</Text>
						<Text className='text-black text-base mt-2'>
							To create a new password, check the link below:
						</Text>

						<Link
							href={resetLink}
							className='inline-flex justify-center items-center rounded-full text-sm font-medium text-white bg-[#18b9ae] px-5 py-2'
						>
							Reset Password
						</Link>
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
