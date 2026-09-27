import type { User } from '@/prisma/generated/browser'
import type { SessionMetadata } from '@/src/shared/types/session-metadata.types'

export const MESSAGES = {
	welcome:
		`<b>👋 Welcome to TeaStream Bot!</b>\n\n` +
		`To receive notifications and improve your experience on the platform, let's link your Telegram account to TeaStream.\n\n` +
		`Click the button below and go to the <b>Notifications</b> section to complete the setup.`,
	authSuccess: `🎉 You have successfully logged in and your Telegram account is linked to TeaStream!\n\n`,
	invalidToken: '❌ Invalid or expired token.',
	userNotFound: '❌ User not found',
	profile: (user: User, followersCount: number) =>
		`<b>👤 User profile:</b>\n\n` +
		`👤 Username: <b>${user.username}</b>\n` +
		`📧 Email: <b>${user.email}</b>\n` +
		`👥 Followers: <b>${followersCount}</b>\n` +
		`📝 About: <b>${user.bio || 'Not specified'}</b>\n\n` +
		`🔧 Click the button below to go to your profile settings.`,
	follows: (user: User) =>
		`📺 <a href="https://teastream.ru/${user.username}">${user.username}</a>`,
	resetPassword: (token: string, metadata: SessionMetadata) =>
		`<b>🔒 Password Reset</b>\n\n` +
		`You requested a password reset for your account on the <b>TeaStream</b> platform.\n\n` +
		`To create a new password, please follow the link below:\n\n` +
		`<b><a href="https://teastream.ru/account/recovery/${token}">Reset password</a></b>\n\n` +
		`📅 <b>Request date:</b> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n\n` +
		`🖥️ <b>Request information:</b>\n\n` +
		`🌍 <b>Location:</b> ${metadata.location.country}, ${metadata.location.city}\n` +
		`📱 <b>Operating system:</b> ${metadata.device.os}\n` +
		`🌐 <b>Browser:</b> ${metadata.device.browser}\n` +
		`💻 <b>IP address:</b> ${metadata.ip}\n\n` +
		`If you did not make this request, simply ignore this message.\n\n` +
		`Thank you for using <b>TeaStream</b>! 🚀`,
	deactivate: (token: string, metadata: SessionMetadata) =>
		`<b>⚠️ Account Deactivation Request</b>\n\n` +
		`You have started the process of deactivating your account on the <b>TeaStream</b> platform.\n\n` +
		`To complete the operation, please confirm your request by entering the following confirmation code:\n\n` +
		`<b>Confirmation code: ${token}</b>\n\n` +
		`📅 <b>Request date:</b> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n\n` +
		`🖥️ <b>Request information:</b>\n\n` +
		`🌍 <b>Location:</b> ${metadata.location.country}, ${metadata.location.city}\n` +
		`📱 <b>Operating system:</b> ${metadata.device.os}\n` +
		`🌐 <b>Browser:</b> ${metadata.device.browser}\n` +
		`💻 <b>IP address:</b> ${metadata.ip}\n\n` +
		`<b>What happens after deactivation?</b>\n\n` +
		`1. You will be automatically logged out and lose access to your account.\n` +
		`2. If you do not cancel the deactivation within 7 days, your account will be <b>permanently deleted</b> along with all your information, data and subscriptions.\n\n` +
		`<b>⏳ Please note:</b> If you change your mind within 7 days, you can contact our support team to restore access to your account before it is fully deleted.\n` +
		`Once your account is deleted, it cannot be restored, and all data will be lost permanently.\n\n` +
		`If you changed your mind, simply ignore this message. Your account will remain active.\n\n` +
		`Thank you for using <b>TeaStream</b>! We are always happy to see you on our platform and hope you will stay with us. 🚀\n\n` +
		`Best regards,\n` +
		`The TeaStream Team`,
	accountDeleted:
		`<b>⚠️ Your account has been fully deleted.</b>\n\n` +
		`Your account has been completely erased from the TeaStream database. All your data and information have been permanently deleted. ❌\n\n` +
		`🔒 You will no longer receive notifications via Telegram or email.\n\n` +
		`If you want to return to the platform, you can sign up using the following link:\n` +
		`<b><a href="https://teastream.ru/account/create">Sign up on TeaStream</a></b>\n\n` +
		`Thank you for being with us! We will always be happy to see you on the platform. 🚀\n\n` +
		`Best regards,\n` +
		`The TeaStream Team`,
	streamStart: (channel: User) =>
		`<b>📡 A stream has started on the ${channel.displayName} channel!</b>\n\n` +
		`Watch here: <a href="https://teastream.ru/${channel.username}">Go to the stream</a>`,
	newFollowing: (follower: User, followersCount: number) =>
		`<b>👥 You have a new follower!</b>\n\n` +
		`It's <a href="https://teastream.ru/${follower.username}">${follower.displayName}</a>\n\n` +
		`Total followers on your channel: ${followersCount}`
}
