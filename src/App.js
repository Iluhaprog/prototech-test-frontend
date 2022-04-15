import * as React from "react"
import "antd/dist/antd.css"
import "./App.css"
import { Routes, Route } from "react-router-dom"
import { SignUpPage } from "./pages/sign-up"
import { SignInPage } from "./pages/sign-in/index"
import { Home } from "./pages/home"
import { Header } from "./feature/header"

function App () {
	return (
		<>
			<Header />
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sign-in" element={<SignInPage />} />
					<Route path="/sign-up" element={<SignUpPage />} />
				</Routes>
			</div>
		</>
	)
}

export default App
