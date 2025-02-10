import { Dispatch } from "@reduxjs/toolkit"
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
import { ApiHandler } from "../../utils/apiHandler"
export const createProduct = (form: any) => async (dispatch: Dispatch) => {
	return ApiHandler(
		async () => {
			const { data } = await axiosInstance.post(`/createProduct`, form)
			return data
		},
		dispatch,
		() => createProductStart(),
		(d) => createProductSuccess({ productId: d?.productId, productName: d?.productName }),
		() => createProductFail()
	)
}
export const addStockInProd = (form: any) => async (dispatch: Dispatch) => {
	return ApiHandler(
		() => axiosInstance.post(`/addStockInProd`, form),
		dispatch,
		() => addStockInProdStart(),
		() => addStockInProdSuccess(),
		() => addStockInProdFail()
	)
}

export const getAllProducts =
	(search: string, page: number, limit: number, categoryName?: string) => async (dispatch: Dispatch) => {
		let url = ""
		if (search) url = `/getAllProductList?search=${search}&page=${page}&limit=${limit}`
		else if (categoryName && search) url = `/getAllProductList/${categoryName}?search=${search}&page=${page}&limit=${limit}`
		else if (categoryName && !search) url = `/getAllProductList/${categoryName}?page=${page}&limit=${limit}`
		else url = `/getAllProductList?page=${page}&limit=${limit}`
		return ApiHandler(
			async () => {
				const { data } = await axiosInstance.get(url, { redundantAPICall: false } as any)

				const allProduct = await data?.allProducts?.results?.map((prod: any) => ({
					...prod,
					prodImg: prod.prodImg.url,
					stock: prod.stock.reduce((acc: any, curr: any) => acc + curr.quantity, 0)
				}))
				return allProduct
			},
			dispatch,
			() => getAllProductListStart(),
			(d) => getAllProductListSuccess(d),
			() => getAllProductListFail()
		)
	}

export const getSingleProductList = (id: string) => async (dispatch: Dispatch) => {
	return ApiHandler(
		async () => {
			const { data } = await axiosInstance.get(`/getSingleProductList/${id}`, { redundantAPICall: false } as any)
			return data
		},
		dispatch,
		() => getSingleProductListStart(),
		(d) =>
			getSingleProductListSuccess({
				singleProduct: d?.singleProduct,
				availableStock: d?.availableStock,
				outOfStock: d?.outOfStock
			}),
		() => getSingleProductListFail()
	)
}

export const updateSingleProductList = (id: string, form: any) => async (dispatch: Dispatch) => {
	return ApiHandler(
		() => axiosInstance.put(`/updateSingleProductList/${id}`, form),
		dispatch,
		() => updateSingleProductListStart(),
		() => updateSingleProductListSuccess(),
		() => updateSingleProductListFail()
	)
}

export const getExpiredProduct = (date: number, page: number, limit: number) => async (dispatch: Dispatch) => {
	return ApiHandler(
		async () => {
			const { data } = await axiosInstance.post(`/getExpiredProduct?page=${page}&limit=${limit}`, { date })
			return data?.expiredProduct
		},
		dispatch,
		() => getExpiredProductStart(),
		(d) => getExpiredProductSuccess(d),
		() => getExpiredProductFail()
	)
}
