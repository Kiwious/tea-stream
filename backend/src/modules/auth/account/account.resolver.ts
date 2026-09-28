import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import type { User } from '@/prisma/generated/browser'
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { Authorized } from '@/src/shared/decorators/authorized.decorator'

import { AccountService } from './account.service'
import { ChangeEmailInput } from './inputs/change-email.input'
import { ChangePasswordInput } from './inputs/change-password.input'
import { CreateUserInput } from './inputs/create-user.input'
import { UserModel } from './models/user.model'

@Resolver('Account')
export class AccountResolver {
	constructor(private readonly accountService: AccountService) {}

	@Authorization()
	@Query(() => UserModel, { name: 'findProfile' })
	public async me(@Authorized('id') id: string) {
		return await this.accountService.me(id)
	}

	@Mutation(() => Boolean, { name: 'createUser' })
	public async create(@Args('data') input: CreateUserInput) {
		return this.accountService.create(input)
	}

	@Authorization()
	@Mutation(() => Boolean, { name: 'changeEmail' })
	public async changeEmail(
		@Args('data') input: ChangeEmailInput,
		@Authorized() user: User
	) {
		return this.accountService.changeEmail(user, input)
	}

	@Authorization()
	@Mutation(() => Boolean, { name: 'changePassword' })
	public async changePassword(
		@Args('data') input: ChangePasswordInput,
		@Authorized() user: User
	) {
		return this.accountService.changePassword(user, input)
	}
}
