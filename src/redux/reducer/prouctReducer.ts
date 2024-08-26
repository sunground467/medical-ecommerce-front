import { createSlice } from "@reduxjs/toolkit"

interface Product {
	prodImg: string
	_id: string
	prodName: string
	categoryName: string
	costPrice: number
	mrpRate: number
	sellingPrice: number
	isPrescription: boolean
	isDiscount: boolean
	discountPerCentage: number
	stock: number
	createdAt: string
	updatedAt: string
	__v: number
	brandName: string
}

interface ProductsAction {
	loading: boolean
	secoundloading: boolean
	productId: string
	productName: string
	allProducts: Product[]
	singleProduct: []
	availableStock: number
	outOfStock: number
	expiredProduct: []
	loaded: boolean
}

const initialState: ProductsAction = {
	loading: false,
	secoundloading: false,
	productId: "",
	productName: "",
	allProducts: [],
	singleProduct: [],
	availableStock: 0,
	outOfStock: 0,
	expiredProduct: [],
	loaded: false
}

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		// for product
		createProductStart(state) {
			state.secoundloading = true
		},
		createProductSuccess(state, action) {
			state.secoundloading = false
			state.productId = action.payload.productId
			state.productName = action.payload.productName
		},
		createProductFail(state) {
			state.secoundloading = false
		},
		getAllProductListStart(state) {
			state.loading = true
		},
		getAllProductListSuccess(state, action) {
			state.loading = false
			state.allProducts = action.payload
			state.loaded = true
		},
		getAllProductListFail(state) {
			state.loaded = false
			state.loading = false
		},
		getSingleProductListStart(state) {
			state.loading = true
		},
		getSingleProductListSuccess(state, action) {
			state.loading = false
			state.singleProduct = action.payload?.singleProduct
			state.availableStock = action.payload?.availableStock
			state.outOfStock = action.payload?.outOfStock
		},
		getSingleProductListFail(state) {
			state.loading = false
		},
		updateSingleProductListStart(state) {
			state.loading = true
		},
		updateSingleProductListSuccess(state) {
			state.loading = false
		},
		updateSingleProductListFail(state) {
			state.loading = false
		},
		addStockInProdStart(state) {
			state.loading = true
		},
		addStockInProdSuccess(state) {
			state.loading = false
		},
		addStockInProdFail(state) {
			state.loading = false
		},
		getExpiredProductStart(state) {
			state.loading = true
		},
		getExpiredProductSuccess(state, action) {
			state.loading = false
			state.expiredProduct = action.payload
		},
		getExpiredProductFail(state) {
			state.loading = false
		}
	}
})

export const {
	createProductStart,
	createProductSuccess,
	createProductFail,
	getAllProductListStart,
	getAllProductListSuccess,
	getAllProductListFail,
	getSingleProductListStart,
	getSingleProductListSuccess,
	getSingleProductListFail,
	updateSingleProductListStart,
	updateSingleProductListSuccess,
	updateSingleProductListFail,
	addStockInProdStart,
	addStockInProdSuccess,
	addStockInProdFail,
	getExpiredProductStart,
	getExpiredProductSuccess,
	getExpiredProductFail
} = productSlice.actions

export default productSlice
