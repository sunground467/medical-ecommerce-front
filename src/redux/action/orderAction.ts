import { Dispatch } from "@reduxjs/toolkit"
import axiosInstance from "../../component/interceptor/interceptor"
import {
	allOrdersFail,
	allOrdersStart,
	allOrdersSuccess,
	getOrderByWeeksFail,
	getOrderByWeeksStart,
	getOrderByWeeksSuccess,
	ordersCountFail,
	ordersCountStart,
	ordersCountSuccess,
	returnCreatedAtDataFail,
	returnCreatedAtDataStart,
	returnCreatedAtDataSuccess,
	updateOrderStatusFail,
	updateOrderStatusStart,
	updateOrderStatusSuccess,
	createPaymentFail,
	createPaymentStart,
	createPaymentSuccess,
	myOrderListFail,
	myOrderListStart,
	myOrderListSuccess,
	newOrderFail,
	newOrderStart,
	newOrderSuccess,
	updateMyOrderStatusFail,
	updateMyOrderStatusSuccess
} from "../reducer/orderReducer"

export const getAllOrders =
	(search: string, page: number, limit: number) =>
	async (
		dispatch: (arg0: {
			payload: string | undefined
			type: "order/allOrdersStart" | "order/allOrdersSuccess" | "order/allOrdersFail"
		}) => void
	) => {
		try {
			dispatch(allOrdersStart())
			const url = search
				? `/all-orders?search=${search}&page=${page}&limit=${limit}`
				: `/all-orders?page=${page}&limit=${limit}`
			const { data } = await axiosInstance.get(url)
			if (data) dispatch(allOrdersSuccess(data?.allOrders))
		} catch (error) {
			dispatch(allOrdersFail())
		}
	}

export const getAllOrdersCount =
	(startDate: any, endDate: any) =>
	async (
		dispatch: (arg0: {
			payload: string | undefined
			type: "order/ordersCountStart" | "order/ordersCountSuccess" | "order/ordersCountFail"
		}) => void
	) => {
		try {
			dispatch(ordersCountStart())

			const { data } = await axiosInstance.get(`/order-status-count/${startDate}/${endDate}`, {
				redundantAPICall: false
			} as any)
			if (data) dispatch(ordersCountSuccess(data?.results))
		} catch (error) {
			dispatch(ordersCountFail())
		}
	}

export const returnCreatedAtData =
	(year?: string) =>
	async (
		dispatch: (args0: {
			payload: string | undefined
			type: "order/returnCreatedAtDataStart" | "order/returnCreatedAtDataSuccess" | "order/returnCreatedAtDataFail"
		}) => void
	) => {
		try {
			dispatch(returnCreatedAtDataStart())
			const url = year ? `/created-at-data/${year}` : `/created-at-data`
			const { data } = await axiosInstance.get(url)
			if (data) dispatch(returnCreatedAtDataSuccess(data?.createdAtData))
		} catch (error) {
			dispatch(returnCreatedAtDataFail())
		}
	}

export const updateOrderStatus =
	(form: any) =>
	async (
		dispatch: (args0: {
			payload: string | undefined
			type: "order/updateOrderStatusStart" | "order/updateOrderStatusSuccess" | "order/updateOrderStatusFail"
		}) => void
	) => {
		try {
			dispatch(updateOrderStatusStart())
			const { data } = await axiosInstance.patch(`/admin-update-order/${form?.id}`, form)
			if (data) dispatch(updateOrderStatusSuccess())
		} catch (error) {
			dispatch(updateOrderStatusFail())
		}
	}

export const getOrdersByWeeks =
	(dateArray: any[]) =>
	async (
		dispatch: (args0: {
			payload: string | undefined
			type: "order/getOrderByWeeksStart" | "order/getOrderByWeeksSuccess" | "order/getOrderByWeeksFail"
		}) => void
	) => {
		try {
			dispatch(getOrderByWeeksStart())
			const { data } = await axiosInstance.post("/get-allOrders-by-weeks", { dateArray })
			dispatch(getOrderByWeeksSuccess({ pending: data?.pending, delivered: data?.delivered, ongoing: data?.ongoing }))
		} catch (error) {
			dispatch(getOrderByWeeksFail())
		}
	}

// for client

export const createNewOrder =
	(orderItems: any[]) =>
	async (
		dispatch: (args0: {
			payload: string | undefined
			type: "order/newOrderStart" | "order/newOrderSuccess" | "order/newOrderFail"
		}) => void
	) => {
		try {
			dispatch(newOrderStart())
			const { data } = await axiosInstance.post("/new-order", { orderItems })
			if (data) {
				dispatch(newOrderSuccess(data?.newOrder))
			}
		} catch (error) {
			dispatch(newOrderFail())
		}
	}
export const createPayment =
	(orderId: string, paymentMethod: string) =>
	async (
		dispatch: (args0: {
			payload: string | undefined
			type: "order/createPaymentStart" | "order/createPaymentSuccess" | "order/createPaymentFail"
		}) => void
	) => {
		try {
			dispatch(createPaymentStart())
			const { data } = await axiosInstance.patch("/update-payment-methode", {
				orderId,
				paymentMethod
			})
			if (data) {
				dispatch(createPaymentSuccess())
			}
		} catch (error) {
			dispatch(createPaymentFail())
		}
	}

export const getMyOrderlist = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch(myOrderListStart())
			const { data } = await axiosInstance.get(`/my-order`)
			if (data) {
				const myOrder = data?.myOrder?.map((my: any) => ({
					...my,
					orderItems: my?.orderItems?.map((o: any) => ({
						...o,
						prodImg: o?.prodImg?.url
					}))
				}))
				dispatch(myOrderListSuccess(myOrder))
			}
		} catch (error) {
			dispatch(myOrderListFail())
		}
	}
}

export const updateMyOrderStatus =
	(id: string, orderStatus: string) =>
	async (
		dispatch: (args0: {
			payload: string | undefined
			type: "order/updateMyOrderStatusStart" | "order/updateMyOrderStatusSuccess" | "order/updateMyOrderStatusFail"
		}) => void
	) => {
		try {
			dispatch(updateMyOrderStatusFail())
			const { data } = await axiosInstance.patch(`/update-myorder-status/${id}`, {
				orderStatus
			})
			if (data) {
				dispatch(updateMyOrderStatusSuccess())
			}
		} catch (error) {
			dispatch(updateMyOrderStatusFail())
		}
	}
