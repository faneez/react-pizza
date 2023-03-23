import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { TRootState } from "../../store"
import { pizzaType } from "."

import axios from "axios"
import { TCategory, TSort } from "../sort/filterSlice"

interface IPizzaState {
	pizzas: pizzaType[]
	pizzasStatus: string
	search: string
	currentPage: string
}

const initialState: IPizzaState = {
	pizzas: [],
	pizzasStatus: "idle",
	search: "",
	currentPage: "1",
}

export interface IAsyncProps {
	activeSort: TSort
	activeCategory: TCategory
	search: string
	currentPage: string
}

export const fetchPizzas = createAsyncThunk(
	"pizzas/fetchPizzas",
	async ({
		activeSort = TSort.RATING,
		activeCategory = TCategory.ALL,
		search = "",
		currentPage = "1",
	}: IAsyncProps) => {
		const param = activeSort === "title" ? "asc" : "desc"

		const url = new URL("https://6404273f80d9c5c7bac1bd76.mockapi.io/items")
		url.searchParams.append("sortBy", activeSort)
		url.searchParams.append("order", param)

		url.searchParams.append("page", currentPage)
		url.searchParams.append("limit", "4")

		if (activeCategory !== "all") {
			url.searchParams.append("filter", activeCategory)
		}

		if (search) {
			url.searchParams.append("search", search)
		}

		const { data } = await axios.get<pizzaType[]>(String(url))
		return data
	}
)

const pizzasSlice = createSlice({
	name: "pizzas",
	initialState,
	reducers: {
		onSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload
		},
		setCurrentPage: (state, action: PayloadAction<string>) => {
			state.currentPage = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.pizzasStatus = "loading"
			})
			.addCase(
				fetchPizzas.fulfilled,
				(state, action: PayloadAction<pizzaType[]>) => {
					state.pizzas = action.payload
					state.pizzasStatus = "idle"
				}
			)
			.addCase(fetchPizzas.rejected, (state) => {
				state.pizzasStatus = "error"
			})
	},
})

export default pizzasSlice.reducer

export const selectSearch = (state: TRootState) => state.pizzas.search
export const selectCurrentPage = (state: TRootState) => state.pizzas.currentPage
export const selectPizzaStatus = (state: TRootState) =>
	state.pizzas.pizzasStatus

export const selectPizzas = (state: TRootState) => state.pizzas.pizzas

export const { onSearch, setCurrentPage } = pizzasSlice.actions
