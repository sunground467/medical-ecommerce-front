import { Dispatch } from "@reduxjs/toolkit"

export const ApiHandler = async <T>(
	apiFunction: () => Promise<T>,
	dispatch: Dispatch,
	startAction: () => any,
	successAction: (data: T) => any,
	failAction: (error: string) => any
) => {
	try {
		dispatch(startAction())
		const data = await apiFunction()
		dispatch(successAction(data))
	} catch (error: any) {
		console.error("API Error:", error.response?.data || error.message)
		dispatch(failAction("Something went wrong"))
		return null
	}
}
