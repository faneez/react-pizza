import React, { useState } from "react"

import { addPizza, changeCnt, selectCartPizza } from "../cart/cartSlice"
import { useSelector } from "react-redux"
import { pizzaType } from "."
import { useAppDispatch } from "./../../store/index"

type PizzaBlockProps = {
	pizza: pizzaType
}

export type cartPizzaType = {
	id: number
	img: string
	size: number
	title: string
	price: number
	type: number
	cnt: number
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ pizza }) => {
	const types = ["тонкая", "традиционная"]
	const [activeType, setActiveType] = useState(pizza.types[0])
	const [activeSize, setActiveSize] = useState(pizza.sizes[0])

	const dispatch = useAppDispatch()

	const addPizzaToCart = (pizza: cartPizzaType) => {
		dispatch(addPizza(pizza))
	}
	const cartPizza = useSelector(selectCartPizza(pizza, activeType, activeSize))

	return (
		<div className="pizza-block-wrapper">
			<div className="pizza-block" key={pizza.id}>
				<img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
				<h4 className="pizza-block__title">{pizza.title}</h4>
				<div className="pizza-block__selector">
					<ul>
						{pizza.types.map((indexType: number, idx: number) => {
							return (
								<li
									key={`${idx}`}
									className={indexType === activeType ? "active" : ""}
									onClick={() => {
										setActiveType(indexType)
									}}
								>
									{types[indexType]}
								</li>
							)
						})}
					</ul>
					<ul>
						{pizza.sizes.map((size) => {
							return (
								<li
									className={activeSize === size ? "active" : ""}
									onClick={() => {
										setActiveSize(size)
									}}
									key={`${pizza.title} ${size}`}
								>
									{size}
								</li>
							)
						})}
					</ul>
				</div>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">от {pizza.price} ₽</div>
					<button
						onClick={() => {
							if (!cartPizza) {
								addPizzaToCart({
									id: pizza.id,
									img: pizza.imageUrl,
									title: pizza.title,
									size: activeSize,
									type: activeType,
									price: pizza.price,
									cnt: 1,
								})
							} else {
								dispatch(
									changeCnt({
										id: pizza.id,
										cnt: cartPizza.cnt + 1,
										type: activeType,
										size: activeSize,
									})
								)
							}
						}}
						className="button button--outline button--add"
					>
						<svg
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
								fill="white"
							/>
						</svg>
						<span>Добавить</span>
						<i>{cartPizza ? cartPizza.cnt : 0}</i>
					</button>
				</div>
			</div>
		</div>
	)
}

export default PizzaBlock
