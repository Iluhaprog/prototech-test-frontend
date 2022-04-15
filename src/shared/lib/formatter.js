export function formatDate (date) {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	console.log(`${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`)
	return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`
}
