import React from "react"
import Categories from "../components/category/Categories"
import Sort from "../components/sort/Sort"
import Pizzas from "../components/Pizzas"

import Pagination from "../components/Pagination/Pagination"

const MainPage: React.FC = () => {
	return (
		<>
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<Pizzas />
			<Pagination />
		</>
	)
}

export default MainPage
