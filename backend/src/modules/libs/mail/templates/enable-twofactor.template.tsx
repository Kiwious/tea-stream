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

interface Props {
	domain: string
}

export function EnableTwoFactorTemplate({ domain }: Props) {
	const settingsLink = `${domain}/dashboard/settings`
	return (
		<Html>
			<Head />
			<Preview>Secure your account</Preview>
			<Tailwind>
				<Body className='mx-auto max-w-2xl bg-slate-50 p-6'>
					<Section className='mb-8 text-center'>
						<Heading className='text-3xl font-bold text-black'>
							Protect your account with two-factor authentication
						</Heading>
						<Text className='mt-2 text-base text-black'>
							Enable two-factor authentication to make your
							account more secure.
						</Text>
					</Section>

					<Section className='mb-6 rounded-lg bg-white p-6 text-center shadow-md'>
						<Heading className='text-2xl font-semibold text-black'>
							Why is this important?
						</Heading>
						<Text className='mt-2 text-base text-black'>
							Two-factor authentication adds an extra layer of
							protection by requiring a code that only you know.
						</Text>
						<Link
							href={settingsLink}
							className='inline-flex items-center justify-center rounded-full bg-[#18B9AE] px-5 py-2 text-sm font-medium text-white'
						>
							Go to account settings
						</Link>
					</Section>

					<Section className='mt-8 text-center'>
						<Text className='text-gray-600'>
							If you have any questions, please contact our
							support team at{' '}
							<Link
								href='mailto:help@teastream.ru'
								className='text-[#18b9ae] underline'
							>
								help@teastream.ru
							</Link>
							.
						</Text>
					</Section>
				</Body>
			</Tailwind>
		</Html>
	)
}
