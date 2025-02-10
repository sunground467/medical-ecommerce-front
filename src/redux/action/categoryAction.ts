import { Dispatch } from "@reduxjs/toolkit"
import axiosInstance from "../../component/interceptor/interceptor"
import { ApiHandler } from "../../utils/apiHandler"
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
export const createCatorgyMainTitle = (categoryTitle: string) => async (dispatch: Dispatch) => {
	return ApiHandler(
		() => axiosInstance.post(`/categoryMainTitle`, { categoryTitle }),
		dispatch,
		() => categoryMainTitleStart(),
		() => categoryMainTitleSuccess(),
		() => categoryMainTitleFail()
	)
}

export const updateCatorgyMainTitle =
	(id: string, forCategoryMainTitle: string, categoryTitle: string) => async (dispatch: Dispatch) => {
		return ApiHandler(
			() => axiosInstance.put(`/categoryTitle/${id}`, { forCategoryMainTitle, categoryTitle }),
			dispatch,
			() => categoryMainTitleStart(),
			() => categoryMainTitleSuccess(),
			() => categoryMainTitleFail()
		)
	}

export const getAllCategories = (search: string, limit: number, page: number) => async (dispatch: Dispatch) => {
	const url = search
		? `/getAllCategories?search=${search}&page=${page}&limit=${limit}`
		: `/getAllCategories?page=${page}&limit=${limit}`

	return ApiHandler(
		() => axiosInstance.get(url),
		dispatch,
		() => allCategoryStart(),
		(data) => allCategorySuccess(data.data.allCategories),
		() => allCategoryFail()
	)
}

export const createSubCategory = (form: any) => async (dispatch: Dispatch) => {
	return ApiHandler(
		() => axiosInstance.post(`/createSubCategory`, form),
		dispatch,
		() => createSubCategoryStart(),
		() => createSubCategorySuccess(),
		() => createSubCategoryFail()
	)
}

export const getAllSubCategories = (search: string, limit: number, page: number) => async (dispatch: Dispatch) => {
	const url = search
		? `/allSubCategory?search=${search}&page=${page}&limit=${limit}`
		: `/allSubCategory?page=${page}&limit=${limit}`
	return ApiHandler(
		async () => {
			const { data } = await axiosInstance.get(url)
			const updateNewArr = data?.allSubCategory.map((cat: any) => ({
				...cat,
				subCategoryImg: cat?.subCategoryImg?.url
			}))
			return updateNewArr
		},
		dispatch,
		() => allSubCategoryStart(),
		(data) => allSubCategorySuccess(data),
		() => allSubCategoryFail()
	)
}
