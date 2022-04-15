import * as React from "react"
import { Form, Input, Button } from "antd"

import PropTypes from "prop-types"
import { Navigate } from "react-router-dom"
import { useStore } from "effector-react"
import { $authStore, setToken } from "../../shared/model/user"
import { showSuccess, showErrors } from "../../shared/lib/notifications"

export function AuthForm ({
	type
}) {
	const isAuthorized = !!useStore($authStore).token
	const [ isCreated, setIsCreated ] = React.useState(false)

	const onFinish = (values) => {
		switch (type) {
		case "sign-in":
			signIn(
				values.email,
				values.password,
				data => {
					console.log(data)
					setToken(data.metadata.access_token)
				}
			)
			break
		case "sign-up":
			signUp(values.name, values.email, values.password)
				.then((res) => {
					setIsCreated(res)
				})
			break
		}
	}

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo)
	}

	if (isCreated) return <Navigate to="/sign-in" />

	return isAuthorized
		? (
			<Navigate
				to="/wall"
			/>
		)
		: (
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				{
					type === "sign-up"
						? <Form.Item
							label="Name"
							name="name"
							rules={[ { required: true, message: "Please input your name!" } ]}
						>
							<Input />
						</Form.Item>
						: <></>
				}
				<Form.Item
					label="Email"
					name="email"
					rules={[ { required: true, message: "Please input your email!" } ]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[ { required: true, message: "Please input your password!" } ]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
          Submit
					</Button>
				</Form.Item>
			</Form>
		)
}

AuthForm.propTypes = {
	type: PropTypes.oneOf([ "sign-in", "sign-up" ])
}

function signIn (email, password, handler) {
	return handleResponse(
		fetch(`${process.env.REACT_APP_API_URL}/api/sign-in`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email,
				password
			})
		}),
		handler
	)
}

function signUp (name, email, password) {
	return handleResponse(
		fetch(`${process.env.REACT_APP_API_URL}/api/sign-up`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email,
				name,
				password
			})
		})
	)
}

function handleResponse (promise, handler) {
	return promise
		.then((res) => {
			if (res.status >= 400) {
				return res.json()
			}
			if (handler) {
				res.json().then(handler)
			}
			return ""
		})
		.then(data => {
			if (data) {
				return {
					error: true,
					data
				}
			}
			return data
		})
		.then((data) => {
			if (data && data.error) {
				showErrors(data)
				return false
			} else {
				showSuccess()
				return true
			}
		})
}
