import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import categorySlice from "./reducer/categoryReducer"
import productSlice from "./reducer/prouctReducer"
import commonActionSlice from "./reducer/commonReducer"
import userSlice from "./reducer/userReducer"
import orderSlice from "./reducer/orderReducer"
import { cartReducer } from "./reducer/cartReducer"

export const store = configureStore({
	reducer: {
		category: categorySlice.reducer,
		product: productSlice.reducer,
		common: commonActionSlice.reducer,
		users: userSlice.reducer,
		orders: orderSlice.reducer,
		cart: cartReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const backendUrl = import.meta.env.VITE_API_URL
