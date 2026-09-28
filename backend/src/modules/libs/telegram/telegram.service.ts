import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Action, Command, Ctx, Start, Update } from 'nestjs-telegraf'
import { Context, Telegraf } from 'telegraf'

import type { SponsorshipPlan, User } from '@/prisma/generated/browser'
import { TokenType } from '@/prisma/generated/enums'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import type { SessionMetadata } from '@/src/shared/types/session-metadata.types'
import { checkTokenExpired } from '@/src/shared/utils/check-token-expired.util'

import { BUTTONS } from './telegram.buttons'
import { MESSAGES } from './telegram.messages'

@Update()
@Injectable()
export class TelegramService extends Telegraf {
	private readonly _token: string

	constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService
	) {
		super(configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN'))
		this._token = configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN')
	}

	@Start()
	public async onStart(@Ctx() ctx: Context) {
		const chatId = ctx.chat?.id.toString()

		if (!chatId) {
			await ctx.reply('ChatId not found')
			return
		}

		const text =
			ctx.message && 'text' in ctx.message ? ctx.message.text : ''

		const token = text.split(' ')[1]

		if (token) {
			const authToken = await this.prismaService.token.findUnique({
				where: {
					token,
					type: TokenType.TELEGRAM_AUTH
				}
			})

			if (!authToken || !authToken.userId) {
				await ctx.replyWithHTML(MESSAGES.invalidToken)
				return
			}

			try {
				checkTokenExpired(authToken)
			} catch {
				await ctx.replyWithHTML(MESSAGES.invalidToken)
				return
			}

			await this.connectTelegram(authToken.userId, chatId)
			await this.prismaService.token.delete({
				where: {
					id: authToken.id
				}
			})

			await ctx.replyWithHTML(MESSAGES.authSuccess, BUTTONS.authSuccess)
			return
		} else {
			const user = await this.findUserByChatId(chatId)

			if (user) {
				await this.onMe(ctx)
			} else {
				await ctx.replyWithHTML(MESSAGES.welcome, BUTTONS.profile)
			}
		}
	}

	@Command('me')
	@Action('me')
	public async onMe(@Ctx() ctx: Context) {
		const chatId = ctx.chat?.id.toString()

		if (!chatId) {
			await ctx.reply('ChatId not found')
			return
		}

		const user = await this.findUserByChatId(chatId)

		if (!user) {
			await ctx.replyWithHTML(MESSAGES.welcome, BUTTONS.profile)
			return
		}

		const followersCount = await this.prismaService.follow.count({
			where: {
				followingId: user.id
			}
		})

		await ctx.replyWithHTML(
			MESSAGES.profile(user, followersCount),
			BUTTONS.profile
		)
	}

	@Command('follows')
	@Action('follows')
	public async onFollows(@Ctx() ctx: Context) {
		const chatId = ctx.chat?.id.toString()

		if (!chatId) {
			await ctx.reply('ChatId not found')
			return
		}

		const user = await this.findUserByChatId(chatId)
		if (!user) {
			await ctx.replyWithHTML(MESSAGES.welcome, BUTTONS.profile)
			return
		}
		const follows = await this.prismaService.follow.findMany({
			where: {
				followerId: user.id
			},
			include: {
				following: true
			}
		})

		if (user && follows.length) {
			const followsList = follows
				.map(follow => MESSAGES.follows(follow.following))
				.join('\n')

			const message = `<b>☀️ Channels you follow:</b>\n\n${followsList}`

			await ctx.replyWithHTML(message)
		} else {
			await ctx.replyWithHTML(
				'<b>❌ You are not following any channels.</b>'
			)
		}
	}

	public async sendEnableTwoFactor(chatId: string) {
		await this.telegram.sendMessage(chatId, MESSAGES.enableTwoFactor, {
			parse_mode: 'HTML'
		})
	}

	public async sendVerifyChannel(chatId: string) {
		await this.telegram.sendMessage(chatId, MESSAGES.verifyChannel, {
			parse_mode: 'HTML'
		})
	}

	public async sendNewSponsorship(
		chatId: string,
		plan: SponsorshipPlan,
		sponsor: User
	) {
		await this.telegram.sendMessage(
			chatId,
			MESSAGES.newSponsorship(plan, sponsor),
			{
				parse_mode: 'HTML'
			}
		)
	}

	public async sendDeactivateToken(
		chatId: string,
		token: string,
		metadata: SessionMetadata
	) {
		await this.telegram.sendMessage(
			chatId,
			MESSAGES.deactivate(token, metadata),
			{ parse_mode: 'HTML' }
		)
	}

	public async sendAccountDeletion(chatId: string) {
		await this.telegram.sendMessage(chatId, MESSAGES.accountDeleted, {
			parse_mode: 'HTML'
		})
	}

	public async sendPasswordResetToken(
		chatId: string,
		token: string,
		metadata: SessionMetadata
	) {
		await this.telegram.sendMessage(
			chatId,
			MESSAGES.resetPassword(token, metadata),
			{ parse_mode: 'HTML' }
		)
	}

	public async sendStreamStart(chatId: string, channel: User) {
		await this.telegram.sendMessage(chatId, MESSAGES.streamStart(channel), {
			parse_mode: 'HTML'
		})
	}

	public async sendNewFollowing(chatId: string, follower: User) {
		const user = await this.findUserByChatId(chatId)
		if (!user) return

		await this.telegram.sendMessage(
			chatId,
			MESSAGES.newFollowing(follower, user.followings.length),
			{
				parse_mode: 'HTML'
			}
		)
	}

	private async connectTelegram(userId: string, chatId: string) {
		await this.prismaService.user.update({
			where: {
				id: userId
			},
			data: {
				telegramId: chatId
			}
		})
	}

	private async findUserByChatId(chatId: string) {
		return this.prismaService.user.findUnique({
			where: {
				telegramId: chatId
			},
			include: {
				followers: true,
				followings: true
			}
		})
	}
}
