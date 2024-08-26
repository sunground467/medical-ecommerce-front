import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { toast } from "react-toastify"
import { backendUrl } from "../../redux/store"

const axiosInstance = axios.create({
	baseURL: backendUrl
})

// Cache initialization
// const cache = new Map()

axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig<any>) => {
		try {
			const token = JSON.parse(localStorage.getItem("token") as string)
			if (token && config.headers) {
				config.headers.Authorization = token ? `Bearer ${token}` : ""
			}

			// Cache check for GET requests with redundantAPICall enabled
			// if (config?.method === "get" && config.redundantAPICall !== false) {
			// 	const cachedResponse = cache.get(config.url)
			// 	if (cachedResponse) {
			// 		// Cancel the current request and return the cached response
			// 		config.cancelToken = new axios.CancelToken((cancel) => cancel("Request canceled due to redundant call."))
			// 		return Promise.resolve(cachedResponse)
			// 	}
			// }
		} catch (error) {
			console.error("Error retrieving token from localStorage", error)
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	(response: AxiosResponse<any, any>) => {
		const method = response?.config?.method?.toUpperCase() // Get HTTP method
		if (method === "POST" || method === "DELETE" || method === "PUT" || method === "PATCH") {
			toast.success(response?.data?.message, { autoClose: 1000 })
		}

		// Cache the response for GET requests with redundantAPICall enabled
		// if (method === "GET" && response?.config?.redundantAPICall !== false) {
		// 	cache.set(response.config.url, response)
		// }

		return response
	},
	(error) => {
		console.log(error)
		// if (axios.isCancel(error)) {
		// 	// Return the cached response if request was canceled due to redundancy
		// 	return Promise.resolve(error)
		// }
		toast.error(error?.response?.data?.message, { autoClose: 3000 })
		return Promise.reject(error)
	}
)

export default axiosInstance
