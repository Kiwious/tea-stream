export function convertPrice(price: number) {
	return price.toLocaleString('de-DE', {
		style: 'currency',
		currency: 'EUR'
	})
}
