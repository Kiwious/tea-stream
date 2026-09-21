import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator'

import { NewPasswordInput } from '@/src/modules/auth/password-recovery/inputs/new-password.input'

@ValidatorConstraint({ name: 'IsPasswordMatching', async: false })
export class IsPasswordMatchingConstraint implements ValidatorConstraintInterface {
	public validate(
		passwordRepeat: any,
		validationArguments?: ValidationArguments
	): Promise<boolean> | boolean {
		const obj = validationArguments?.object as NewPasswordInput
		return obj.password === passwordRepeat
	}
	public defaultMessage?(validationArguments?: ValidationArguments): string {
		return "Password don't match"
	}
}
