import { PropsWithChildren } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../common/card'

interface Props {
    heading: string
}

export function FormWrapper({children,heading}: PropsWithChildren<Props>) {
    return <Card>
        <CardHeader className='p-4'>
            <CardTitle className='text-lg'>
                {heading}
            </CardTitle>
            <CardContent className='p-0'>
                {children}
            </CardContent>
        </CardHeader>
    </Card>
}