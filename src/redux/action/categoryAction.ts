import axiosInstance from "../../component/interceptor/interceptor"
import {
	allCategoryFail,
	allCategoryStart,
	allCategorySuccess,
	allSubCategoryFail,
	allSubCategoryStart,
	allSubCategorySuccess,
	categoryMainTitleFail,
	categoryMainTitleStart,
	categoryMainTitleSuccess,
	createSubCategoryFail,
	createSubCategoryStart,
	createSubCategorySuccess
} from "../reducer/categoryReducer"
export const createCatorgyMainTitle =
	(categoryTitle: string) =>
	async (
		dispatch: (arg0: {
			payload: string | undefined
			type: "category/categoryMainTitleStart" | "category/categoryMainTitleSuccess" | "category/categoryMainTitleFail"
		}) => void
	) => {
		try {
			dispatch(categoryMainTitleStart())
			const { data } = await axiosInstance.post(`/categoryMainTitle`, { categoryTitle })
			if (data) {
				dispatch(categoryMainTitleSuccess())
			}
		} catch (error: any) {
			dispatch(categoryMainTitleFail())
		}
	}
export const updateCatorgyMainTitle =
	(id: string, forCategoryMainTitle: string, categoryTitle: string) =>
	async (
		dispatch: (arg0: {
			payload: string | undefined
			type: "category/categoryMainTitleStart" | "category/categoryMainTitleSuccess" | "category/categoryMainTitleFail"
		}) => void
	) => {
		try {
			console.log(id)
			dispatch(categoryMainTitleStart())
			const { data } = await axiosInstance.put(`/categoryTitle/${id}`, { forCategoryMainTitle, categoryTitle })
			if (data) {
				dispatch(categoryMainTitleSuccess())
			}
		} catch (error: any) {
			dispatch(categoryMainTitleFail())
		}
	}

export const getAllCategories =
	(search: string, limit: number, page: number) =>
	async (
		dispatch: (args0: {
			payload: string | undefined
			type: "category/allCategoryStart" | "category/allCategorySuccess" | "category/allCategoryFail"
		}) => void
	) => {
		try {
			const url = search
				? `/getAllCategories?search=${search}&page=${page}&limit=${limit}`
				: `/getAllCategories?page=${page}&limit=${limit}`
			dispatch(allCategoryStart())
			const { data } = await axiosInstance.get(url)
			if (data) {
				dispatch(allCategorySuccess(data?.allCategories))
			}
		} catch (error) {
			dispatch(allCategoryFail())
		}
	}

export const createSubCategory =
	(form: any) =>
	async (
		dispatch: (arg0: {
			payload: string | undefined
			type: "category/createSubCategoryStart" | "category/createSubCategorySuccess" | "category/createSubCategoryFail"
		}) => void
	) => {
		try {
			dispatch(createSubCategoryStart())
			const { data } = await axiosInstance.post(`/createSubCategory`, form)
			if (data) {
				dispatch(createSubCategorySuccess(data?.message))
			}
		} catch (error) {
			dispatch(createSubCategoryFail())
		}
	}

export const getAllSubCategories =
	(search: string, limit: number, page: number) =>
	async (
		dispatch: (args0: {
			payload: string | undefined
			type: "category/allSubCategoryStart" | "category/allSubCategorySuccess" | "category/allSubCategoryFail"
		}) => void
	) => {
		try {
			const url = search
				? `/allSubCategory?search=${search}&page=${page}&limit=${limit}`
				: `/allSubCategory?page=${page}&limit=${limit}`
			dispatch(allSubCategoryStart())
			const { data } = await axiosInstance.get(url)
			if (data) {
				const updateNewArr = data?.allSubCategory.map((cat: any) => ({
					...cat,
					subCategoryImg: cat?.subCategoryImg?.url
				}))
				dispatch(allSubCategorySuccess(updateNewArr))
			}
		} catch (error) {
			dispatch(allSubCategoryFail())
		}
	}
