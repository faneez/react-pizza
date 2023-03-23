import React, { useEffect, useRef } from "react"
import { fetchPizzas, IAsyncProps, selectPizzas } from "./pizzasSlice"
import { useSelector } from "react-redux"
import qs from "qs"
import { useNavigate } from "react-router-dom"
import {
	setFilters,
	selectActiveCategory,
	selectActiveSort,
} from "../sort/filterSlice"
import {
	setCurrentPage,
	selectSearch,
	selectPizzaStatus,
	selectCurrentPage,
} from "./pizzasSlice"

import PizzaBlock from "./PizzaBlock"
import Skeleton from "./Skeleton"
import { useAppDispatch } from "./../../store/index"

export type pizzaType = {
	id: number
	imageUrl: string
	title: string
	types: number[]
	sizes: number[]
	price: number
	category: string
	rating: number
}

const Pizzas: React.FC = () => {
	const dispatch = useAppDispatch()
	const isSearch = useRef(false)
	const isMounted = useRef(false)
	const activeCategory = useSelector(selectActiveCategory)
	const search = useSelector(selectSearch)
	const navigate = useNavigate()

	const pizzasStatus = useSelector(selectPizzaStatus)
	const activeSort = useSelector(selectActiveSort)

	const currentPage = useSelector(selectCurrentPage)

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(
				window.location.search.substring(1)
			) as unknown as IAsyncProps
			dispatch(setFilters(params))
			dispatch(setCurrentPage(params.currentPage))
			isSearch.current = true
		} else {
			isSearch.current = false
		}
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0)

		if (!isSearch.current) {
			dispatch(fetchPizzas({ activeSort, activeCategory, search, currentPage }))
		}
		isSearch.current = false
	}, [activeSort, activeCategory, search, currentPage])

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				activeSort,
				activeCategory,
				currentPage,
			})
			navigate(`?${queryString}`)
		}

		isMounted.current = true
	}, [activeSort, activeCategory, currentPage])

	const pizzas = useSelector(selectPizzas)

	if (pizzasStatus === "loading") {
		return (
			<>
				{[...new Array(6)].map((_, index) => {
					return <Skeleton key={index} />
				})}
			</>
		)
	}
	if (pizzasStatus === "error") {
		return (
			<>
				<h3>Ошибка..</h3>
			</>
		)
	}

	return (
		<>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{pizzas.map((pizza: pizzaType) => {
					return <PizzaBlock key={pizza.id} pizza={pizza} />
				})}
			</div>
		</>
	)
}

export default Pizzas
