import * as React from "react"
import { useStore } from "effector-react"
import { Layout, Row, Typography } from "antd"
import { $authStore } from "../../shared/model/user"
import { SearchLine, SearchList } from "../../feature/search-currency"

export function Home () {
	const isAuthorized = !!useStore($authStore).token

	return (

		<Layout.Content >
			<Row justify="center" align="middle" style={{ height: "calc(100vh - 64px)", paddingTop: "60px" }}>
				{
					isAuthorized
						? (
							<>
								<SearchLine />
								<SearchList />
							</>
						)
						: (
							<Typography.Title level={2} style={{ height: "50px" }}>
								Authorize to search
							</Typography.Title>
						)
				}
			</Row>
		</Layout.Content>
	)
}
