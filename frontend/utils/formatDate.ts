export function formatDate(
	dateString: string | Date,
	locale: string,
	includeTime: boolean = false
) {
	const date = new Date(dateString)

	return new Intl.DateTimeFormat(locale, {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		...(includeTime && { hour: '2-digit', minute: '2-digit' })
	}).format(date)
}
