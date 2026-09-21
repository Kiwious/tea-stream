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
	token: string
}

export function VerifyTemplate({ domain, token }: Props) {
	const verificationLink = `${domain}/account/verify?token=${token}`
	return (
		<Html>
			<Head />
			<Preview>Account verification</Preview>
			<Tailwind>
				<Body className='max-w-2xl mx-auto p-6 bg-slate-50'>
					<Section className='text-center mb-8'>
						<Heading className='text-3xl text-black font-bold'>
							E-Mail verification
						</Heading>
						<Text className='text-base text-black'>
							Thank you for registering on TeaStream! To confirm
							your E-Mail, please go on the following Link:
						</Text>
						<Link
							href={verificationLink}
							className='inline-flex justify-center items-center rounded-full text-sm font-medium text-white bg-[#18b9ae] px-5 py-2'
						>
							Verify E-Mail
						</Link>
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
