import { Markup } from 'telegraf'

export const BUTTONS = {
	authSuccess: Markup.inlineKeyboard([
		[
			Markup.button.callback('📜 My followings', 'follows'),
			Markup.button.callback('👤 View profile', 'me')
		],
		[Markup.button.url('🌐 Go to website', 'https://teastream.ru')]
	]),
	profile: Markup.inlineKeyboard([
		Markup.button.url(
			'⚙️ Account settings',
			'https://teastream.ru/dashboard/settings'
		)
	])
}
