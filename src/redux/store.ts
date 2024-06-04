import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import categorySlice from "./reducer/categoryReducer"
import productSlice from "./reducer/prouctReducer"
import commonActionSlice from "./reducer/commonReducer"
import userSlice from "./reducer/userReducer"

export const store = configureStore({
	reducer: {
		category: categorySlice.reducer,
		product: productSlice.reducer,
		common: commonActionSlice.reducer,
		users: userSlice.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const backendUrl = "http://localhost:4500/api/v1"
