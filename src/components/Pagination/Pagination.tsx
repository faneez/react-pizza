import ReactPaginate from "react-paginate"

import { setCurrentPage } from "../Pizzas/pizzasSlice"

import styles from "./pagination.module.scss"
import { useAppDispatch } from "./../../store/index"

const Pagination: React.FC = () => {
	const dispatch = useAppDispatch()

	return (
		<>
			<ReactPaginate
				className={styles.root}
				breakLabel="..."
				nextLabel=">"
				onPageChange={(event) => {
					dispatch(setCurrentPage(String(event.selected + 1)))
				}}
				pageRangeDisplayed={5}
				pageCount={3}
				previousLabel="<"
			/>
		</>
	)
}
export default Pagination
