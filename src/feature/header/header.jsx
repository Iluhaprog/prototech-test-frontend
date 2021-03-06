import * as React from "react"
import { Row, Layout, Typography, Col, Button } from "antd"
import { Link } from "react-router-dom"
import { useStore } from "effector-react"
import { $authStore, setToken } from "../../shared/model/user"

export function Header () {
	const isAuthorized = !!useStore($authStore).token

	return (
		<Layout.Header>
			<Row>
				<Col span={6}>
					<Typography.Title level={2} style={{ color: "#fff", paddingTop: "8px" }}>
            Currencies
					</Typography.Title>
				</Col>
				<Col span={12}></Col>
				{
					!isAuthorized
						? (

							<Col span={5}>
								<Row>
									<Col span={11}>
										<Link to="/sign-up">
											<Button block type="default">
                        Sign Up
											</Button>
										</Link>
									</Col>
									<Col span={11} style={{ marginLeft: "5px" }}>
										<Link to="/sign-In">
											<Button block type="primary">
                        Sign In
											</Button>
										</Link>
									</Col>
								</Row>
							</Col>
						)
						: (<>
							<Col span={5}>
								<Row justify="end">
									<Col>
										<Button danger type="primary" onClick={() => setToken("")}>
											Logout
										</Button>
									</Col>
								</Row>
							</Col>
						</>)
				}
			</Row>
		</Layout.Header>
	)
}
