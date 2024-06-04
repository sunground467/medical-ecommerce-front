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
    singleUserFail,
    singleUserStart,
    singleUserSuccess
} from "../reducer/userReducer"

export const addEmployeeFunc =
	(form: FormField, id?: string) =>
	async (
		dispatch: (args0: {
			payload: string | undefined
			type: "users/addEmployeeStart" | "users/addEmployeeSuccess" | "users/addEmployeeFail"
		}) => void
	) => {
		try {
			dispatch(addEmployeeStart())
			let response
			if (id) {
				const { data } = await axiosInstance.patch(`/add-employee/${id}`, form)
				response = data
			} else {
				const { data } = await axiosInstance.post("/add-employee", form)
				response = data
			}
			if (response) {
				dispatch(addEmployeeSuccess())
			}
		} catch (error) {
			dispatch(addEmployeeFail())
		}
	}
export const allEmployeeFunc =
	(search: string, page: number, limit: number) =>
	async (
		dispatch: (args0: {
			payload: string | undefined
			type: "users/allEmployeeStart" | "users/allEmployeeSuccess" | "users/allEmployeeFail"
		}) => void
	) => {
		try {
			dispatch(allEmployeeStart())
			const url = search
				? `/getAllEmployee?search=${search}&page=${page}&limit=${limit}`
				: `/getAllEmployee?page=${page}&limit=${limit}`
			const { data } = await axiosInstance.get(url)

			if (data) {
				const allEmployee = await data?.allEmployee.map((emp: any) => ({
					...emp,
					profileImg: emp.profileImg.URL,
					prescriptionImg: emp.prescriptionImg.URL
				}))
				dispatch(allEmployeeSuccess(allEmployee))
			}
		} catch (error) {
			dispatch(allEmployeeFail())
		}
	}
export const allUsersFunc =
	(search: string, page: number, limit: number) =>
	async (
		dispatch: (args0: {
			payload: string | undefined
			type: "users/allUsersStart" | "users/allUsersSuccess" | "users/allUsersFail"
		}) => void
	) => {
		try {
			dispatch(allUsersStart())
			const url = search
				? `/getAllUsers?search=${search}&page=${page}&limit=${limit}`
				: `/getAllUsers?page=${page}&limit=${limit}`
			const { data } = await axiosInstance.get(url)

			if (data) {
				const allUsers = await data?.allUsers.map((emp: any) => ({
					...emp,
					profileImg: emp.profileImg.URL,
					prescriptionImg: emp.prescriptionImg.URL
				}))
				dispatch(allUsersSuccess(allUsers))
			}
		} catch (error) {
			dispatch(allUsersFail())
		}
	}

export const getSingleUserFunc =
	(id: string) =>
	async (
		dispatch: (arg0: {
			payload: string | undefined
			type: "users/singleUserStart" | "users/singleUserSuccess" | "users/singleUserFail"
		}) => void
	) => {
		try {
			dispatch(singleUserStart())
			const { data } = await axiosInstance.get(`/getSingleUser/${id}`)
			if (data) dispatch(singleUserSuccess(data?.singleUser))
		} catch (error: any) {
			dispatch(singleUserFail())
		}
	}
