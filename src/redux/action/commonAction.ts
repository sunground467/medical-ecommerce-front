import { Dispatch } from "@reduxjs/toolkit"
import axiosInstance from "../../component/interceptor/interceptor"
import { DeleteFail, DeleteStart, DeleteSuccess } from "../reducer/commonReducer"
import { ApiHandler } from "../../utils/apiHandler"

export const commonDeleteFunc = (endPoint: string, id: string) => async (dispatch: Dispatch) => {
	return ApiHandler(
		() => axiosInstance.delete(`/${endPoint}/${id}`),
		dispatch,
		() => DeleteStart(),
		() => DeleteSuccess(),
		() => DeleteFail()
	)
}
