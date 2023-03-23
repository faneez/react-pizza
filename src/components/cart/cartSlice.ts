import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { cartPizzaType } from "../Pizzas/PizzaBlock"
import { TRootState } from "../../store"
import { pizzaType } from "../Pizzas"
import { getCartLS } from "../../utils/getCartLS"

const initialState: cartPizzaType[] = []

interface IPizzaCnt {
	id: number
	cnt: number
	type: number
	size: number
}

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addPizza: (state, action: PayloadAction<cartPizzaType>) => {
			state.push(action.payload)
		},
		deletePizza: (state, action: PayloadAction<IPizzaCnt>) => {
			return state.filter((pizza) => {
				if (
					pizza.id === action.payload.id &&
					pizza.type === action.payload.type &&
					pizza.size === action.payload.size
				) {
					return false
				}
				return true
			})
		},
		changeCnt: (state, action: PayloadAction<IPizzaCnt>) => {
			return state.map((pizza) => {
				if (
					pizza.id === action.payload.id &&
					pizza.type === action.payload.type &&
					pizza.size === action.payload.size
				) {
					return { ...pizza, cnt: action.payload.cnt }
				} else {
					return pizza
				}
			})
		},
		reduceCnt: (state, action: PayloadAction<IPizzaCnt>) => {
			return state.map((pizza) => {
				if (
					pizza.id === action.payload.id &&
					pizza.type === action.payload.type &&
					pizza.size === action.payload.size
				) {
					return { ...pizza, cnt: action.payload.cnt }
				} else {
					return pizza
				}
			})
		},
		clearCart: () => {
			return []
		},
	},
})

export default cartSlice.reducer

export const selectCartPizza =
	(pizza: pizzaType, activeType: number, activeSize: number) =>
	(state: TRootState) =>
		state.cart.find(
			(cartPizza: cartPizzaType) =>
				cartPizza.id === pizza.id &&
				cartPizza.size === activeSize &&
				cartPizza.type === activeType
		)
export const selectCartPizzas = (state: TRootState) => state.cart

export const { addPizza, changeCnt, clearCart, deletePizza } = cartSlice.actions
