import { Dispatch } from "@reduxjs/toolkit"
import axiosInstance from "../../component/interceptor/interceptor"
import { FormField } from "../../component/interface/all-interface"
import {
	addEmployeeFail,
	addEmployeeStart,
	addEmployeeSuccess,
	allEmployeeFail,
	allEmployeeStart,
	allEmployeeSuccess,
	allUsersFail,
	allUsersStart,
	allUsersSuccess,
	logoutFail,
	logoutStart,
	logoutSuccess,
	myProfileFail,
	myProfileStart,
	myProfileSuccess,
	singleUserFail,
	singleUserStart,
	singleUserSuccess,
	updateMyProfileFail,
	updateMyProfileStart,
	updateMyProfileSuccess,
	uploadProfileAndPrescriptionImgFail,
	uploadProfileAndPrescriptionImgStart,
	uploadProfileAndPrescriptionImgSuccess
} from "../reducer/userReducer"
import { ApiHandler } from "../../utils/apiHandler"

export const addEmployeeFunc = (form: FormField, id?: string) => async (dispatch: Dispatch) => {
	return ApiHandler(
		async () => {
			let response
			if (id) {
				const { data } = await axiosInstance.patch(`/add-employee/${id}`, form)
				response = data
			} else {
				const { data } = await axiosInstance.post("/add-employee", form)
				response = data
			}
			return response
		},
		dispatch,
		() => addEmployeeStart(),
		() => addEmployeeSuccess(),
		() => addEmployeeFail()
	)
}
export const allEmployeeFunc = (search: string, page: number, limit: number) => async (dispatch: Dispatch) => {
	const url = search
		? `/getAllEmployee?search=${search}&page=${page}&limit=${limit}`
		: `/getAllEmployee?page=${page}&limit=${limit}`
	return ApiHandler(
		async () => {
			const { data } = await axiosInstance.get(url)

			const allEmployee = await data?.allEmployee.map((emp: any) => ({
				...emp,
				profileImg: emp.profileImg.URL,
				prescriptionImg: emp.prescriptionImg.URL
			}))
			return { allEmployee, female: data?.female, male: data?.male }
		},
		dispatch,
		() => allEmployeeStart(),
		(d) => allEmployeeSuccess({ allEmployee: d?.allEmployee, female: d?.female, male: d?.male }),
		() => allEmployeeFail()
	)
}
export const allUsersFunc = (search: string, page: number, limit: number) => async (dispatch: Dispatch) => {
	const url = search ? `/getAllUsers?search=${search}&page=${page}&limit=${limit}` : `/getAllUsers?page=${page}&limit=${limit}`
	return ApiHandler(
		async () => {
			const { data } = await axiosInstance.get(url)

			const allUsers = await data?.allUsers.map((emp: any) => ({
				...emp,
				profileImg: emp.profileImg.URL,
				prescriptionImg: emp.prescriptionImg.URL
			}))
			return { allUsers, female: data?.female, male: data?.male }
		},
		dispatch,
		() => allUsersStart(),
		(d) => allUsersSuccess({ allUsers: d?.allUsers, female: d?.female, male: d?.male }),
		() => allUsersFail()
	)
}

export const getSingleUserFunc = (id: string) => async (dispatch: Dispatch) => {
	return ApiHandler(
		async () => {
			const { data } = await axiosInstance.get(`/getSingleUser/${id}`)
			return data?.singleUser
		},
		dispatch,
		() => singleUserStart(),
		(d) => singleUserSuccess(d),
		() => singleUserFail()
	)
}

// for client side

export const uploadProfileAndPrescriptionImg = (file: any, method: string) => async (dispatch: Dispatch) => {
	const url = method === "profilePic" ? "/updateProfilePic" : "/updatePrescription"
	return ApiHandler(
		() =>
			axiosInstance.patch(url, {
				file
			}),
		dispatch,
		() => uploadProfileAndPrescriptionImgStart(),
		() => uploadProfileAndPrescriptionImgSuccess(),
		() => uploadProfileAndPrescriptionImgFail()
	)
}
export const myProfile = () => async (dispatch: Dispatch) => {
	return ApiHandler(
		async () => {
			const { data } = await axiosInstance.get("/my-profile")
			return data?.user
		},
		dispatch,
		() => myProfileStart(),
		(d) => myProfileSuccess(d),
		() => myProfileFail()
	)
}
export const updateMyProfile = (form: any) => async (dispatch: Dispatch) => {
	return ApiHandler(
		async () => {
			const { data } = await axiosInstance.patch("/updateProfile", form)
			return data?.user
		},
		dispatch,
		() => updateMyProfileStart(),
		(d) => updateMyProfileSuccess(d),
		() => updateMyProfileFail()
	)
}

export const logout = () => async (dispatch: Dispatch) => {
	try {
		dispatch(logoutStart())
		localStorage.removeItem("token")
		const accessToken = ""
		dispatch(logoutSuccess(accessToken))
	} catch (error) {
		dispatch(logoutFail())
	}
}
