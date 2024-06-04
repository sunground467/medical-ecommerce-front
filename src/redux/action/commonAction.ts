import axiosInstance from "../../component/interceptor/interceptor"
import { DeleteFail, DeleteStart, DeleteSuccess } from "../reducer/commonReducer"

export const commonDeleteFunc =
	(endPoint: string, id: string) =>
	async (
		dispatch: (arg0: {
			payload: string | undefined
			type: "common/DeleteStart" | "common/DeleteSuccess" | "common/DeleteFail"
		}) => void
	) => {
		try {
			dispatch(DeleteStart())
			const { data } = await axiosInstance.delete(`/${endPoint}/${id}`)
			if (data) {
				dispatch(DeleteSuccess())
			}
		} catch (error: any) {
			dispatch(DeleteFail())
		}
	}
