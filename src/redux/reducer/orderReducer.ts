import { createSlice } from "@reduxjs/toolkit"

const initialState: any = {
	loading: false,
	allOrders: [],
	ordersCount: {},
	createdAtData: {},
	perWeekOrder: {}
}

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		allOrdersStart(state) {
			state.loading = true
		},
		allOrdersSuccess(state, action) {
			state.loading = false
			state.allOrders = action.payload
		},
		allOrdersFail(state) {
			state.loading = false
		},
		ordersCountStart(state) {
			state.loading = true
			state.ordersCount = {}
		},
		ordersCountSuccess(state, action) {
			state.loading = false
			state.ordersCount = action.payload
		},
		ordersCountFail(state) {
			state.loading = false
		},
		returnCreatedAtDataStart(state) {
			state.loading = true
		},
		returnCreatedAtDataSuccess(state, action) {
			state.loading = false
			state.createdAtData = action.payload
		},
		returnCreatedAtDataFail(state) {
			state.loading = false
		},
		updateOrderStatusStart(state) {
			state.loading = true
		},
		updateOrderStatusSuccess(state) {
			state.loading = false
		},
		updateOrderStatusFail(state) {
			state.loading = false
		},
		getOrderByWeeksStart(state) {
			state.loading = true
			state.perWeekOrder = {}
		},
		getOrderByWeeksSuccess(state, action) {
			state.loading = false
			state.perWeekOrder = action.payload
		},
		getOrderByWeeksFail(state) {
			state.loading = false
		}
	}
})

export const {
	allOrdersStart,
	allOrdersSuccess,
	allOrdersFail,
	ordersCountStart,
	ordersCountSuccess,
	ordersCountFail,
	returnCreatedAtDataStart,
	returnCreatedAtDataSuccess,
	returnCreatedAtDataFail,
	updateOrderStatusStart,
	updateOrderStatusSuccess,
	updateOrderStatusFail,
	getOrderByWeeksStart,
	getOrderByWeeksSuccess,
	getOrderByWeeksFail,
} = orderSlice.actions

export default orderSlice
