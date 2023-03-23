import "./scss/app.scss"
import Header from "./components/header/Header"
import { Routes, Route } from "react-router-dom"
import { Suspense } from "react"

import { MainPage, E404 } from "./pages"
import React from "react"

const CartPage = React.lazy(() => import("./pages/CartPage"))

const App: React.FC = () => {
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route
							path="/cart"
							element={
								<Suspense fallback={<div> загрузка корзины </div>}>
									<CartPage></CartPage>
								</Suspense>
							}
						/>
						<Route path="*" element={<E404 />} />
					</Routes>
				</div>
			</div>
		</div>
	)
}

export default App
