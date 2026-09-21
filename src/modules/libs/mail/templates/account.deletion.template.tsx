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
export function AccountDeletionTemplate({ domain }: Props) {
	const registerLink = `${domain}/account/create`
	return (
		<Html>
			<Head />
			<Preview>Account deleted</Preview>
			<Tailwind>
				<Body className='max-w-2xl mx-auto p-6 bg-slate-50'>
					<Section className='text-center mb-8'>
						<Heading className='text-3xl text-black font-bold'>
							Your account has been deleted
						</Heading>
						<Text className='text-black text-base mt-2'>
							Your account has been fully deleted from the
							database of TeaStream. All of your data and
							information have been removed irretrievably.
						</Text>
					</Section>

					<Section className='bg-white text-black text-center rounded-lg shadow-md p-6 mb-4'>
						<Text>
							You won't receive any notifications to Telegram and
							E-Mail anymore
						</Text>
						<Text>
							If you want to return to TeaStream, you can register
							on the following link:
						</Text>
						<Link
							href={registerLink}
							className='inline-flex justify-center items-center rounded-md mt-2 text-sm font-medium text-white bg-[#18b9ae] px-5 py-2 rounded-full'
						>
							Register on TeaStream
						</Link>
					</Section>

					<Section className='text-center text-black'>
						<Text>
							Thank you for joining us! We will always be happy
							seeing you on our platform.
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
