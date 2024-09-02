import { createSlice } from "@reduxjs/toolkit"

interface OrderState {
	loading: boolean
	getOrder: null
	myOrderList: any[]
	openModal: boolean
	allOrders: any[]
	allSales: any[]
	ordersCount: any
	createdAtData: any
	perWeekOrder: any
}

const initialState: OrderState = {
	loading: false,
	getOrder: null,
	myOrderList: [],
	openModal: false,
	allOrders: [],
	allSales: [],
	ordersCount: {},
	createdAtData: {},
	perWeekOrder: {}
}

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		allSalesStart(state) {
			state.loading = true
		},
		allSalesSuccess(state, action) {
			state.loading = false
			state.allSales = action.payload
		},
		allSalesFail(state) {
			state.loading = false
		},
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
		},
		newOrderStart(state) {
			state.loading = true
		},
		newOrderSuccess(state, action) {
			state.loading = false
			state.getOrder = action.payload
		},
		newOrderFail(state) {
			state.loading = false
		},
		createPaymentStart(state) {
			state.loading = true
		},
		createPaymentSuccess(state) {
			state.loading = false
			state.openModal = true
		},
		createPaymentFail(state) {
			state.loading = false
		},
		nullAllvalue(state) {
			state.getOrder = null
			state.openModal = false
		},
		myOrderListStart(state) {
			state.loading = true
			state.myOrderList = []
		},
		myOrderListSuccess(state, action) {
			state.loading = false
			state.myOrderList = action.payload
		},
		myOrderListFail(state) {
			state.loading = false
		},
		updateMyOrderStatusStart(state) {
			state.loading = true
		},
		updateMyOrderStatusSuccess(state) {
			state.loading = false
		},
		updateMyOrderStatusFail(state) {
			state.loading = false
		}
	}
})

export const {
	allSalesStart,
	allSalesSuccess,
	allSalesFail,
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

	// for client
	newOrderStart,
	newOrderSuccess,
	newOrderFail,
	createPaymentStart,
	createPaymentSuccess,
	createPaymentFail,
	nullAllvalue,
	myOrderListStart,
	myOrderListSuccess,
	myOrderListFail,
	updateMyOrderStatusStart,
	updateMyOrderStatusSuccess,
	updateMyOrderStatusFail
} = orderSlice.actions

export default orderSlice
