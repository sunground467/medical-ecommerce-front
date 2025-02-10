import { Dispatch } from "@reduxjs/toolkit"
import axiosInstance from "../../component/interceptor/interceptor"
import {
	allOrdersFail,
	allOrdersStart,
	allOrdersSuccess,
	allSalesFail,
	allSalesStart,
	allSalesSuccess,
	createPaymentFail,
	createPaymentStart,
	createPaymentSuccess,
	getOrderByWeeksFail,
	getOrderByWeeksStart,
	getOrderByWeeksSuccess,
	myOrderListFail,
	myOrderListStart,
	myOrderListSuccess,
	newOrderFail,
	newOrderStart,
	newOrderSuccess,
	ordersCountFail,
	ordersCountStart,
	ordersCountSuccess,
	returnCreatedAtDataFail,
	returnCreatedAtDataStart,
	returnCreatedAtDataSuccess,
	updateMyOrderStatusFail,
	updateMyOrderStatusStart,
	updateMyOrderStatusSuccess,
	updateOrderStatusFail,
	updateOrderStatusStart,
	updateOrderStatusSuccess
} from "../reducer/orderReducer"
import { ApiHandler } from "../../utils/apiHandler"

export const getAllOrders = (search: string, page: number, limit: number) => async (dispatch: Dispatch) => {
	const url = search ? `/all-orders?search=${search}&page=${page}&limit=${limit}` : `/all-orders?page=${page}&limit=${limit}`
	return ApiHandler(
		async () => {
			const { data } = await axiosInstance.get(url)
			return data?.allOrders
		},
		dispatch,
		() => allOrdersStart(),
		(data) => allOrdersSuccess(data),
		() => allOrdersFail()
	)
}

export const getAllOrdersCount = (startDate: any, endDate: any) => async (dispatch: Dispatch) => {
	return ApiHandler(
		async () => {
			const { data } = await axiosInstance.get(`/order-status-count/${startDate}/${endDate}`, {
				redundantAPICall: false
			} as any)
			return data?.results
		},
		dispatch,
		() => ordersCountStart(),
		(data) => ordersCountSuccess(data),
		() => ordersCountFail()
	)
}

export const returnCreatedAtData = (year?: string) => async (dispatch: Dispatch) => {
	const url = year ? `/created-at-data/${year}` : `/created-at-data`
	return ApiHandler(
		async () => {
			const { data } = await axiosInstance.get(url)
			return data?.createdAtData
		},
		dispatch,
		() => returnCreatedAtDataStart(),
		(data) => returnCreatedAtDataSuccess(data),
		() => returnCreatedAtDataFail()
	)
}

export const updateOrderStatus = (form: any) => async (dispatch: Dispatch) => {
	return ApiHandler(
		() => axiosInstance.patch(`/admin-update-order/${form?.id}`, form),
		dispatch,
		() => updateOrderStatusStart(),
		() => updateOrderStatusSuccess(),
		() => updateOrderStatusFail()
	)
}

export const getOrdersByWeeks = (dateArray: any[]) => async (dispatch: Dispatch) => {
	return ApiHandler(
		async () => {
			const { data } = await axiosInstance.post("/get-allOrders-by-weeks", { dateArray })
			return data
		},
		dispatch,
		() => getOrderByWeeksStart(),
		(data) => getOrderByWeeksSuccess({ pending: data?.pending, delivered: data?.delivered, ongoing: data?.ongoing }),
		() => getOrderByWeeksFail()
	)
}

// for client

export const createNewOrder = (orderItems: any[]) => async (dispatch: Dispatch) => {
	return ApiHandler(
		async () => {
			const { data } = await axiosInstance.post("/new-order", { orderItems })
			return data?.newOrder
		},
		dispatch,
		() => newOrderStart(),
		(data) => newOrderSuccess(data),
		() => newOrderFail()
	)
}
export const createPayment = (orderId: string, paymentMethod: string) => async (dispatch: Dispatch) => {
	return ApiHandler(
		() =>
			axiosInstance.patch("/update-payment-methode", {
				orderId,
				paymentMethod
			}),
		dispatch,
		() => createPaymentStart(),
		() => createPaymentSuccess(),
		() => createPaymentFail()
	)
}

export const getMyOrderlist = () => {
	return async (dispatch: Dispatch) => {
		return ApiHandler(
			async () => {
				const { data } = await axiosInstance.get(`/my-order`)
				const myOrder = data?.myOrder?.map((my: any) => ({
					...my,
					orderItems: my?.orderItems?.map((o: any) => ({
						...o,
						prodImg: o?.prodImg?.url
					}))
				}))
				return myOrder
			},
			dispatch,
			() => myOrderListStart(),
			(data) => myOrderListSuccess(data),
			() => myOrderListFail()
		)
	}
}

export const updateMyOrderStatus = (id: string, orderStatus: string) => async (dispatch: Dispatch) => {
	return ApiHandler(
		() =>
			axiosInstance.patch(`/update-myorder-status/${id}`, {
				orderStatus
			}),
		dispatch,
		() => updateMyOrderStatusStart(),
		() => updateMyOrderStatusSuccess(),
		() => updateMyOrderStatusFail()
	)
}

export const getAllSales = () => {
	return async (dispatch: Dispatch) => {
		return ApiHandler(
			async () => {
				const { data } = await axiosInstance.get("/all-sales")
				return data?.allSales
			},
			dispatch,
			() => allSalesStart(),
			(data) => allSalesSuccess(data),
			() => allSalesFail()
		)
	}
}
// 224 lines used before
