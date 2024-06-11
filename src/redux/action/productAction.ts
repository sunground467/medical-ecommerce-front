import axiosInstance from "../../component/interceptor/interceptor"
import {
	addStockInProdFail,
	addStockInProdStart,
	addStockInProdSuccess,
	createProductFail,
	createProductStart,
	createProductSuccess,
	getAllProductListFail,
	getAllProductListStart,
	getAllProductListSuccess,
	getExpiredProductFail,
	getExpiredProductStart,
	getExpiredProductSuccess,
	getSingleProductListFail,
	getSingleProductListStart,
	getSingleProductListSuccess,
	updateSingleProductListFail,
	updateSingleProductListStart,
	updateSingleProductListSuccess
} from "../reducer/prouctReducer"
export const createProduct =
	(form: any) =>
	async (
		dispatch: (arg0: {
			payload: string | undefined
			type: "product/createProductStart" | "product/createProductSuccess" | "product/createProductFail"
		}) => void
	) => {
		try {
			dispatch(createProductStart())
			const { data } = await axiosInstance.post(`/createProduct`, form)
			if (data) {
				dispatch(createProductSuccess({ productId: data?.productId, productName: data?.productName }))
			}
		} catch (error: any) {
			dispatch(createProductFail())
		}
	}
export const addStockInProd =
	(form: any) =>
	async (
		dispatch: (arg0: {
			payload: string | undefined
			type: "product/addStockInProdStart" | "product/addStockInProdSuccess" | "product/addStockInProdFail"
		}) => void
	) => {
		try {
			dispatch(addStockInProdStart())
			const { data } = await axiosInstance.post(`/addStockInProd`, form)
			if (data) {
				dispatch(addStockInProdSuccess())
			}
		} catch (error: any) {
			dispatch(addStockInProdFail())
		}
	}

export const getAllProducts =
	(search: string, page: number, limit: number) =>
	async (
		dispatch: (arg0: {
			payload: string | undefined
			type: "product/getAllProductListStart" | "product/getAllProductListSuccess" | "product/getAllProductListFail"
		}) => void
	) => {
		try {
			dispatch(getAllProductListStart())
			const url = search
				? `/getAllProductList?search=${search}&page=${page}&limit=${limit}`
				: `/getAllProductList?page=${page}&limit=${limit}`
			const { data } = await axiosInstance.get(url)
			if (data) {
				const allProduct = await data?.allProducts.results.map((prod: any) => ({
					...prod,
					prodImg: prod.prodImg.url,
					stock: prod.stock.reduce((acc: any, curr: any) => acc + curr.quantity, 0)
				}))
				dispatch(getAllProductListSuccess(allProduct))
			}
		} catch (error: any) {
			dispatch(getAllProductListFail())
		}
	}

export const getSingleProductList =
	(id: string) =>
	async (
		dispatch: (arg0: {
			payload: string | undefined
			type: "product/getSingleProductListStart" | "product/getSingleProductListSuccess" | "product/getSingleProductListFail"
		}) => void
	) => {
		try {
			dispatch(getSingleProductListStart())
			const { data } = await axiosInstance.get(`/getSingleProductList/${id}`)
			if (data) dispatch(getSingleProductListSuccess(data?.singleProduct))
		} catch (error: any) {
			dispatch(getSingleProductListFail())
		}
	}

export const updateSingleProductList =
	(id: string, form: any) =>
	async (
		dispatch: (arg0: {
			payload: string | undefined
			type:
				| "product/updateSingleProductListStart"
				| "product/updateSingleProductListSuccess"
				| "product/updateSingleProductListFail"
		}) => void
	) => {
		try {
			dispatch(updateSingleProductListStart())
			const { data } = await axiosInstance.put(`/updateSingleProductList/${id}`, form)
			if (data) {
				dispatch(updateSingleProductListSuccess())
			}
		} catch (error: any) {
			dispatch(updateSingleProductListFail())
		}
	}

export const getExpiredProduct =
	(date: number, page: number, limit: number) =>
	async (
		dispatch: (args0: {
			payload: string | undefined
			type: "product/getExpiredProductStart" | "product/getExpiredProductSuccess" | "product/getExpiredProductFail"
		}) => void
	) => {
		try {
			dispatch(getExpiredProductStart())
			const { data } = await axiosInstance.post(`/getExpiredProduct?page=${page}&limit=${limit}`, { date })

			if (data) dispatch(getExpiredProductSuccess(data?.expiredProduct))
		} catch (error) {
			dispatch(getExpiredProductFail())
		}
	}
