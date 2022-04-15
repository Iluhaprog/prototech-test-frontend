export function formatDate (date) {
	const year = date.getFullYear()
	const month = date.getMonth()
	const day = date.getDate()
	return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`
}
