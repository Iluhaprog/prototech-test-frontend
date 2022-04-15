import * as React from "react"
import { useStore } from "effector-react"
import { $currenciesStore } from "./model"
import { Divider, List, Typography, Row, Col, Badge } from "antd"
import { formatDate } from "../../shared/lib/formatter"

export function SearchList () {
	const currencies = useStore($currenciesStore)

	return (
		currencies.length
			? (
				<>
					<Divider orientation="center">{currencies[0].name}</Divider>
					<List
						dataSource={currencies}
						renderItem={item}
					/>
				</>
			)
			: (
				<></>
			)
	)
}

function item (currency) {
	return (
		<List.Item
			style={{ minWidth: "400px" }}
		>
			<Row style={{ width: "100%" }}>
				<Col span={8}>
					<Badge status="success" text={formatDate(new Date(currency.date))}/>
				</Col>
				<Col span={8} offset={8}>
					<Typography.Text mark>Курс: {currency.value}</Typography.Text>
				</Col>
			</Row>
		</List.Item>
	)
}
