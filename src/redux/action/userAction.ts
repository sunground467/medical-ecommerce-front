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
				dispatch(allEmployeeSuccess({ allEmployee, female: data?.female, male: data?.male }))
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
				dispatch(allUsersSuccess({ allUsers, female: data?.female, male: data?.male }))
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

// for client side



export const uploadProfileAndPrescriptionImg =
	(file: any, methode: string) =>
	async (
		dispatch: (args0: {
			payload: string | undefined
			type:
				| "users/uploadProfileAndPrescriptionImgStart"
				| "users/uploadProfileAndPrescriptionImgSuccess"
				| "users/uploadProfileAndPrescriptionImgFail"
		}) => void
	) => {
		try {
			dispatch(uploadProfileAndPrescriptionImgStart())
			const url = methode === "profilePic" ? "/updateProfilePic" : "/updatePrescription"
			const { data } = await axiosInstance.patch(url, {
				file
			})
			if (data) {
				dispatch(uploadProfileAndPrescriptionImgSuccess())
			}
		} catch (error) {
			dispatch(uploadProfileAndPrescriptionImgFail())
		}
	}
export const myProfile =
	() =>
	async (
		dispatch: (args0: {
			payload: string | undefined
			type: "users/myProfileStart" | "users/myProfileSuccess" | "users/myProfileFail"
		}) => void
	) => {
		try {
			dispatch(myProfileStart())
			const { data } = await axiosInstance.get("/my-profile")
			if (data) {
				dispatch(myProfileSuccess(data?.user))
			}
		} catch (error) {
			dispatch(myProfileFail())
		}
	}
export const updateMyProfile =
	(form: any) =>
	async (
		dispatch: (args0: {
			payload: string | undefined
			type: "users/updateMyProfileStart" | "users/updateMyProfileSuccess" | "users/updateMyProfileFail"
		}) => void
	) => {
		try {
			dispatch(updateMyProfileStart())
			const { data } = await axiosInstance.patch("/updateProfile", form)
			if (data) {
				dispatch(updateMyProfileSuccess(data?.user))
			}
		} catch (error) {
			console.log(error)
			dispatch(updateMyProfileFail())
		}
	}

export const logout =
	() =>
	async (
		dispatch: (args0: {
			payload: string | undefined
			type: "users/logoutStart" | "users/logoutSuccess" | "users/logoutFail"
		}) => void
	) => {
		try {
			dispatch(logoutStart())
			localStorage.removeItem("token")
			const accessToken = ""
			dispatch(logoutSuccess(accessToken))
		} catch (error) {
			dispatch(logoutFail())
		}
	}
