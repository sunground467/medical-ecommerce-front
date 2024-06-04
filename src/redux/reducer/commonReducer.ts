import { createSlice } from "@reduxjs/toolkit"

const initialState: any = {
	loading: false
}

const commonActionSlice = createSlice({
	name: "common",
	initialState,
	reducers: {
		DeleteStart(state) {
			state.loading = true
		},
		DeleteSuccess(state) {
			state.loading = false
		},
		DeleteFail(state) {
			state.loading = false
		}
	}
})

export const { DeleteStart, DeleteSuccess, DeleteFail } = commonActionSlice.actions

export default commonActionSlice
