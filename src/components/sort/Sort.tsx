import React from "react"
import { useSelector } from "react-redux"
import { selectActiveSort, setActiveSort, TSort } from "./filterSlice"
import { useAppDispatch } from "./../../store/index"

type SortType = {
	id: number
	name: TSort
	title: string
}

const Sort: React.FC = () => {
	const sort: SortType[] = [
		{
			id: 1,
			name: TSort.RATING,
			title: "популярности",
		},
		{
			id: 2,
			name: TSort.PRICE,
			title: "цене",
		},
		{ id: 3, name: TSort.ALPHABET, title: "алфавиту" },
	]

	const activeSort = useSelector(selectActiveSort)
	const activeSortTitle = sort.find(
		(sort: SortType) => sort.name === activeSort
	)?.title
	const popupRef = React.useRef<HTMLDivElement>(null)

	const [activePopup, setActivePopup] = React.useState(false)

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				popupRef.current &&
				!event.composedPath().includes(popupRef.current)
			) {
				setActivePopup(false)
			}
		}
		document.body.addEventListener("click", handleClickOutside)

		return () => {
			document.body.removeEventListener("click", handleClickOutside)
		}
	}, [])

	const dispatch = useAppDispatch()

	return (
		<div className="sort" ref={popupRef}>
			<div className="sort__label">
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Сортировка по:</b>
				<span
					onClick={() =>
						setActivePopup((prevState) => {
							return !prevState
						})
					}
				>
					{activeSortTitle}
				</span>
			</div>
			{activePopup ? (
				<div className="sort__popup">
					<ul>
						{sort.map((sort) => {
							return (
								<li
									onClick={() => {
										dispatch(setActiveSort(sort.name))
										setActivePopup((prevState) => {
											return !prevState
										})
									}}
									key={sort.id}
								>
									{sort.title}
								</li>
							)
						})}
					</ul>
				</div>
			) : null}
		</div>
	)
}

export default Sort
