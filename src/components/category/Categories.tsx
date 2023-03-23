import React from "react"
import { useSelector } from "react-redux"
import { changeCategory, TCategory } from "../sort/filterSlice"
import { selectActiveCategory } from "./../sort/filterSlice"
import { useAppDispatch } from "./../../store/index"

type CategoryType = {
	id: number
	name: TCategory
	text: string
}
const Categories: React.FC = () => {
	const categories: CategoryType[] = [
		{
			id: 1,
			name: TCategory.ALL,
			text: "Все",
		},
		{
			id: 2,
			name: TCategory.MEAT,
			text: "Мясные",
		},
		{
			id: 3,
			name: TCategory.GRILL,
			text: "Гриль",
		},
		{
			id: 4,
			name: TCategory.SPICY,
			text: "Острая",
		},
		{
			id: 5,
			name: TCategory.CLOSE,
			text: "Закрытые",
		},
	]
	const activeCategory = useSelector(selectActiveCategory)
	const dispatch = useAppDispatch()

	return (
		<div className="categories">
			<ul>
				{categories.map((category) => {
					return (
						<li
							className={activeCategory === category.name ? "active" : ""}
							key={category.id}
							onClick={() => {
								dispatch(changeCategory(category.name))
							}}
						>
							{category.text}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Categories
