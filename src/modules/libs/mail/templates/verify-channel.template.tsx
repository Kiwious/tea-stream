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

export function VerifyChannelTemplate() {
	return (
		<Html>
			<Head />
			<Preview>Your channel has been verified</Preview>
			<Tailwind>
				<Body className='mx-auto max-w-2xl bg-slate-50 p-6'>
					<Section className='mb-8 text-center'>
						<Heading className='text-3xl font-bold text-black'>
							Congratulations! Your channel is verified
						</Heading>
						<Text className='mt-2 text-base text-black'>
							We're happy to let you know that your channel is now
							verified and you've received an official badge.
						</Text>
					</Section>

					<Section className='mb-6 rounded-lg bg-white p-6 text-center shadow-md'>
						<Heading className='text-2xl font-semibold text-black'>
							What does this mean?
						</Heading>
						<Text className='mt-2 text-base text-black'>
							The verification badge confirms that your channel is
							authentic and builds trust with your viewers.
						</Text>
					</Section>

					<Section className='mt-8 text-center'>
						<Text className='text-gray-600'>
							If you have any questions, email us at{' '}
							<Link
								href='mailto:help@teastream.ru'
								className='text-[#18b9ae] underline'
							>
								help@teastream.ru
							</Link>
						</Text>
					</Section>
				</Body>
			</Tailwind>
		</Html>
	)
}
