import { createSlice } from "@reduxjs/toolkit"

const initialState: any = {
	loading: false,
	employee: [],
	employeeLoaded:false,
	userLoaded:false,
	users: [],
	singleUser: []
}

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addEmployeeStart(state) {
			state.loading = true
		},
		addEmployeeSuccess(state) {
			state.loading = false
		},
		addEmployeeFail(state) {
			state.loading = false
		},
		allEmployeeStart(state) {
			state.loading = true
		},
		allEmployeeSuccess(state, action) {
			state.loading = false
			state.employee = action.payload
			state.employeeLoaded =true
		},
		allEmployeeFail(state) {
			state.loading = false
		},
		allUsersStart(state) {
			state.loading = true
		},
		allUsersSuccess(state, action) {
			state.loading = false
			state.users = action.payload
			state.userLoaded =true
		},
		allUsersFail(state) {
			state.loading = false
		},
		singleUserStart(state) {
			state.loading = true
		},
		singleUserSuccess(state, action) {
			state.loading = false
			state.singleUser = action.payload
		},
		singleUserFail(state) {
			state.loading = false
		}
	}
})

export const {
	addEmployeeStart,
	addEmployeeSuccess,
	addEmployeeFail,
	allEmployeeStart,
	allEmployeeSuccess,
	allEmployeeFail,
	allUsersStart,
	allUsersSuccess,
	allUsersFail,
	singleUserStart,
	singleUserSuccess,
	singleUserFail
} = userSlice.actions

export default userSlice
