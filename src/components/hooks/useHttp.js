import axios from "axios"

export function useHttp() {
	const request = async (url, method = "GET", body = null) => {
		try {
			let response = ""
			switch (method) {
				case "GET":
					response = await axios.get(url)
					if (!response.status === 200) {
						throw new Error("Ошибка, не удалось произвести запрос")
					}

					return response.data
				case "POST":
					response = await axios.post(url, body)
					if (!response.status === 200) {
						throw new Error("Ошибка, не удалось произвести запрос")
					}
					return response.data
				default:
					throw new Error("Неизвестный метод отправки данных")
			}
		} catch (e) {
			throw e
		}
	}

	return { request }
}
