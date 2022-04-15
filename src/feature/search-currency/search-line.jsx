import * as React from "react"
import { Form, Input, Button, DatePicker } from "antd"
import { fetchCurrencies } from "./model"
import { $authStore } from "../../shared/model/user"

import { useStore } from "effector-react"
import { formatDate } from "../../shared/lib/formatter"

const { RangePicker } = DatePicker

export function SearchLine () {
	const token = useStore($authStore).token

	const onFinish = (values) => {
		fetchCurrencies({
			token,
			valuteId: values.valuteId,
			from: formatDate(values.date[0]._d),
			to: formatDate(values.date[1]._d)
		})
	}

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo)
	}

	return (
		<Form
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item
				label="Valute ID"
				name="valuteId"
				rules={[ { required: true, message: "Please input valute id!" } ]}

			>
				<Input />
			</Form.Item>

			<Form.Item
				name="date"
				label="Date range"
			>
				<RangePicker />
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
          Submit
				</Button>
			</Form.Item>
		</Form>
	)
}
