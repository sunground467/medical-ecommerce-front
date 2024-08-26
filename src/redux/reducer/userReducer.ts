import { createSlice } from "@reduxjs/toolkit"

interface userState {
	loading: boolean
	employee: []
	employeeLoaded: boolean
	employeeMale: number
	employeeFemale: number
	userLoaded: boolean
	users: []
	userMale: number
	userFemale: number
	singleUser: []
	user: any
	accessToken: string
}

const initialState: userState = {
	loading: false,
	employee: [],
	employeeLoaded: false,
	employeeMale: 0,
	employeeFemale: 0,
	userLoaded: false,
	users: [],
	userMale: 0,
	userFemale: 0,
	singleUser: [],
	user: null,
	accessToken: ""
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
			state.employee = action.payload.allEmployee
			state.employeeMale = action.payload.male
			state.employeeFemale = action.payload.female
			state.employeeLoaded = true
		},
		allEmployeeFail(state) {
			state.loading = false
		},
		allUsersStart(state) {
			state.loading = true
		},
		allUsersSuccess(state, action) {
			state.loading = false
			state.users = action.payload.allUsers
			state.userMale = action.payload.male
			state.userFemale = action.payload.female
			state.userLoaded = true
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
		},
		// for client side

		uploadProfileAndPrescriptionImgStart(state) {
			state.loading = true
		},
		uploadProfileAndPrescriptionImgSuccess(state) {
			state.loading = false
		},
		uploadProfileAndPrescriptionImgFail(state) {
			state.loading = false
		},
		updateAccessToken(state, action) {
			state.accessToken = action.payload
		},
		myProfileStart(state) {
			state.loading = true
		},
		myProfileSuccess(state, action) {
			state.loading = false
			state.user = action.payload
		},
		myProfileFail(state) {
			state.loading = false
		},
		updateMyProfileStart(state) {
			state.loading = true
		},
		updateMyProfileSuccess(state, action) {
			state.loading = false
			state.user = action.payload
		},
		updateMyProfileFail(state) {
			state.loading = false
		},
		logoutStart(state) {
			state.loading = true
		},
		logoutSuccess(state, action) {
			state.loading = false
			state.accessToken = action.payload,
			state.user = null
		},
		logoutFail(state) {
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
	singleUserFail,
	// for client
	updateAccessToken,
	uploadProfileAndPrescriptionImgStart,
	uploadProfileAndPrescriptionImgSuccess,
	uploadProfileAndPrescriptionImgFail,
	myProfileStart,
	myProfileSuccess,
	myProfileFail,
	updateMyProfileStart,
	updateMyProfileSuccess,
	updateMyProfileFail,
	logoutStart,
	logoutSuccess,
	logoutFail
} = userSlice.actions

export default userSlice
