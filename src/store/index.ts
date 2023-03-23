import { combineReducers, configureStore } from "@reduxjs/toolkit"

import pizzas from "../components/Pizzas/pizzasSlice"
import filters from "../components/sort/filterSlice"
import cart from "../components/cart/cartSlice"
import { useDispatch } from "react-redux"

import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["filters", "pizzas"],
}
const rootReducer = combineReducers({ filters, pizzas, cart })
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
	devTools: process.env.NODE_ENV !== "production",
})

export const persistor = persistStore(store)

export type TRootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
