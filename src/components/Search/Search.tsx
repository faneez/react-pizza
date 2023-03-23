import React, { useState, useRef } from "react"
import styles from "./search.module.scss"
import { onSearch } from "../Pizzas/pizzasSlice"
import debounce from "lodash.debounce"
import { useCallback } from "react"
import { useAppDispatch } from "./../../store/index"

export default function Search() {
	const [value, setValue] = useState("")
	const inp = useRef<HTMLInputElement>(null)

	const dispatch = useAppDispatch()

	const onDispatch = useCallback(
		debounce((value: string) => {
			dispatch(onSearch(value))
		}, 250),
		[]
	)

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
		onDispatch(value)
	}
	const deleteValue = () => {
		if (inp.current) {
			inp.current.focus()
			setValue("")
			dispatch(onSearch(""))
		}
	}
	return (
		<div className={styles.searchBox}>
			<svg
				className={styles.icon}
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
				<g
					id="SVGRepo_tracerCarrier"
					strokeLinecap="round"
					strokeLinejoin="round"
				></g>
				<g id="SVGRepo_iconCarrier">
					{" "}
					<path
						d="M17 17L21 21"
						stroke="#323232"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					></path>{" "}
					<path
						d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
						stroke="#323232"
						strokeWidth="2"
					></path>{" "}
				</g>
			</svg>

			<input
				ref={inp}
				onChange={onChange}
				value={value}
				placeholder="Найти пиццы..."
				type="text"
				className={styles.input}
			/>
			<button onClick={deleteValue}>del</button>
		</div>
	)
}
