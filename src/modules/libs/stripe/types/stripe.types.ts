import type { FactoryProvider, ModuleMetadata } from '@nestjs/common'
import { StripeConfig } from 'stripe'

export const StripeOptionsSymbol = Symbol('StripeOptionsSymbol')

export interface TypeStripeOptions {
	apiKey: string
	config?: StripeConfig
}

export type TypeStripeAsyncOptions = Pick<ModuleMetadata, 'imports'> &
	Pick<FactoryProvider<TypeStripeOptions>, 'useFactory' | 'inject'>
