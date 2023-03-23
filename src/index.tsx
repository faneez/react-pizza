import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { persistor, store } from "./store"

import App from "./App"

const mainRoot = document.getElementById("root")
if (mainRoot) {
	const root = ReactDOM.createRoot(mainRoot)
	root.render(
		<BrowserRouter>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<App />
				</PersistGate>
			</Provider>
		</BrowserRouter>
	)
}
