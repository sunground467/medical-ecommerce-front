import { CartType } from "../../component/enums/enum"
export interface CartItems {
	prodImg: string
	_id: string
	prodName: string
	sellingPrice: number
	quantity: number
}
interface CartState {
	cart: CartItems[]
}

const initialState: CartState = {
	cart: JSON.parse(sessionStorage.getItem("cart") as string) || []
}

const saveCartInSessionStorage = (cartItem: any) => {
	sessionStorage.setItem("cart", JSON.stringify(cartItem))
}

export const cartReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case CartType.ADD_CART:
			const updatedCart = [{ ...action.payload?.data, quantity: 1 }, ...state.cart]
			saveCartInSessionStorage(updatedCart)
			return { ...state, cart: updatedCart }

		case CartType.REMOVE_CART:
			const cartRemove = state.cart?.filter((c) => c?._id !== action?.payload?._id)
			saveCartInSessionStorage(cartRemove)
			return { ...state, cart: cartRemove }

		case CartType.CHANGE_QUANTITY:
			const cartQty = state.cart?.map((c) => {
				if (c?._id === action?.payload?._id) {
					return {
						...c,
						quantity: action.payload?.quantity
					}
				} else {
					return c
				}
			})
			saveCartInSessionStorage(cartQty)
			return { ...state, cart: cartQty }
		case CartType.CLEAR_ALL:
			const emptyCart: any[] = []
			saveCartInSessionStorage(emptyCart)
			return { ...state, cart: emptyCart }

		default:
			return state
	}
}
