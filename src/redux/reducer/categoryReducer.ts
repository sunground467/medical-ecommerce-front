import { createSlice } from "@reduxjs/toolkit"

const initialState: any = {
	loading: false,
	categoryLoaded: false,
	subCategoryLoaded: false,
	allCategoryMainTitle: [],
	allSubCategory: [],
}

const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {
		// for category
		categoryMainTitleStart(state) {
			state.loading = true
		},
		categoryMainTitleSuccess(state) {
			state.loading = false
			state.error = null
		},
		categoryMainTitleFail(state) {
			state.loading = false
		},
		allCategoryStart(state) {
			state.loading = true
		},
		allCategorySuccess(state, action) {
			state.loading = false
			state.allCategoryMainTitle = action.payload
			state.categoryLoaded = true
		},
		allCategoryFail(state) {
			state.loading = false
		},
		// for sub category
		createSubCategoryStart(state) {
			state.loading = true
		},
		createSubCategorySuccess(state) {
			state.loading = false
		},
		createSubCategoryFail(state) {
			state.loading = false
		},
		allSubCategoryStart(state) {
			state.loading = true
		},
		allSubCategorySuccess(state, action) {
			state.loading = false
			state.allSubCategory = action.payload
			state.subCategoryLoaded = true
		},
		allSubCategoryFail(state) {
			state.loading = false
		}
	}
})

export const {
	categoryMainTitleStart,
	categoryMainTitleSuccess,
	categoryMainTitleFail,
	allCategoryStart,
	allCategorySuccess,
	allCategoryFail,
	createSubCategoryStart,
	createSubCategorySuccess,
	createSubCategoryFail,
	allSubCategoryStart,
	allSubCategorySuccess,
	allSubCategoryFail
} = categorySlice.actions

export default categorySlice
