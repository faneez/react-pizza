import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TRootState } from "../../store"
import { IAsyncProps } from "../Pizzas/pizzasSlice"

export enum TSort {
	RATING = "rating",
	PRICE = "price",
	ALPHABET = "alphabet",
	TITLE = "title",
}
export enum TCategory {
	ALL = "all",
	MEAT = "meat",
	GRILL = "grill",
	SPICY = "spicy",
	CLOSE = "close",
}
export enum TStatus {
	IDLE = "rating",
	LOADING = "loading",
	ERROR = "error",
}

interface IFilterState {
	activeSort: TSort
	activeCategory: TCategory
	categoryStatus: TStatus
}

const initialState: IFilterState = {
	activeSort: TSort.RATING,
	activeCategory: TCategory.ALL,
	categoryStatus: TStatus.IDLE,
}

const filterSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setActiveSort: (state, action: PayloadAction<TSort>) => {
			state.activeSort = action.payload
		},
		changeCategory: (state, action: PayloadAction<TCategory>) => {
			state.activeCategory = action.payload
		},
		setFilters: (state, action: PayloadAction<IAsyncProps>) => {
			state.activeCategory = action.payload.activeCategory
			state.activeSort = action.payload.activeSort
		},
	},
})

export default filterSlice.reducer

export const selectCategoryStatus = (state: TRootState) =>
	state.filters.categoryStatus

export const selectActiveCategory = (state: TRootState) =>
	state.filters.activeCategory
export const selectActiveSort = (state: TRootState) => state.filters.activeSort

export const { setActiveSort, changeCategory, setFilters } = filterSlice.actions
