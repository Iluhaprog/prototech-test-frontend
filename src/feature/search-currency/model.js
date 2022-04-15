import { createStore, createEvent, createEffect } from "effector"

export const setCurrencies = createEvent()

export const fetchCurrencies = createEffect(async ({ valuteId, from, to, token }) => {
	const res = await fetch(`${process.env.REACT_APP_API_URL}/api/currency/${valuteId}?from=${from}&to=${to}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/json"
		}
	})
	return res.json()
})

export const $currenciesStore = createStore([])
	.on(setCurrencies, (_, data) => [ ...data ])

fetchCurrencies.done.watch(({ params, result }) => {
	setCurrencies(result.data)
})
