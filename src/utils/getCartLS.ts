export const getCartLS = () => {
	// функция не понадобилаь, т.к редьюсер сам все это делает( берет из локал стореджа)
	const cart = localStorage.getItem("persist:root")
	const json = cart ? JSON.parse(cart) : ""

	if (json) {
		return json.cart
	}
}
