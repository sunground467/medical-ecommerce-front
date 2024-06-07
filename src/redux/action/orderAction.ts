import axiosInstance from "../../component/interceptor/interceptor"
import {
	allOrdersFail,
	allOrdersStart,
	allOrdersSuccess,
	ordersCountFail,
	ordersCountStart,
	ordersCountSuccess,
	returnCreatedAtDataFail,
	returnCreatedAtDataStart,
	returnCreatedAtDataSuccess
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
	() =>
	async (
		dispatch: (arg0: {
			payload: string | undefined
			type: "order/ordersCountStart" | "order/ordersCountSuccess" | "order/ordersCountFail"
		}) => void
	) => {
		try {
			dispatch(ordersCountStart())

			const { data } = await axiosInstance.get("/order-status-count")
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
