import { notification } from "antd"

export function showErrors (err) {
	console.log(err.data)
	Object.keys(err.data).forEach((key) => {
		notification.error({ description: err.data[key] })
	})
}

export function showSuccess () {
	notification.success({
		description: "Complete!"
	})
}
