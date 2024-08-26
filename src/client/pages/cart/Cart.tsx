import { useEffect, useState } from "react"
import { CartType } from "../../../component/enums/enum"
import { CartItems } from "../../../redux/reducer/cartReducer"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import LazyLoadImage from "../../../reusable/LazyLoadImage"
import Loader from "../../../component/Loader/Loader"
import axiosInstance from "../../../component/interceptor/interceptor"
import { createNewOrder, getMyOrderlist } from "../../../redux/action/orderAction"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Cart = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [amount, setAmount] = useState<number>(0)
	const { cart } = useAppSelector((state) => state.cart)
	const { accessToken } = useAppSelector((state) => state.users)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const changeQty = (_id: string, quantity: number) => {
		if (quantity < 1) {
			dispatch({
				type: CartType.REMOVE_CART,
				payload: {
					_id
				}
			})
		} else {
			dispatch({
				type: CartType.CHANGE_QUANTITY,
				payload: { _id, quantity }
			})
		}
	}

	useEffect(() => {
		setAmount(cart.reduce((acc: any, curr: CartItems) => acc + curr?.sellingPrice * curr?.quantity, 0).toFixed(2))
	}, [cart])

	const paymentHandler = async () => {
		try {
			if (!accessToken) {
				toast.error("Please Login First")
				return navigate("/login")
			}

			setLoading(true)
			let orderDetail = cart?.map((c) => ({
				_id: c?._id,
				quantity: c?.quantity
			}))
			const { data } = await axiosInstance.post("/payment", { amount: Number(amount) })
			setLoading(false)

			console.log("data", data)
			const options = {
				key: "rzp_test_cfpXwdEBSA6tMg",
				amount: data?.data?.amount,
				currency: "INR",
				order_id: data?.data?.id,
				callback_url: "/paymentVarification",
				handler: async function (response: any) {
					console.log("response", response)
					await dispatch(createNewOrder(orderDetail))
					await dispatch(getMyOrderlist())
					dispatch({
						type: CartType.CLEAR_ALL
					})
					navigate("/myProfile", { state: { myOrder: true } })
				},

				notes: {
					address: "Razorpay Corporate Office"
				},
				theme: {
					color: "#5B2C6F"
				}
			}
			var rzp1 = new window.Razorpay(options)

			rzp1.open()
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	return (
		<div className="flex justify-center items-center">
			<div className="w-[80%] max-[900px]:w-[95%] grid grid-cols-12 gap-4 py-10">
				<div className="col-span-8 max-[900px]:col-span-12 max-[900px]:order-last ">
					{cart.map((c: CartItems) => (
						<div
							className="col-span-12 mb-4 bg-white  border rounded-md shadow p-4 flex justify-between items-center"
							key={c?._id}
						>
							<div className="flex gap-10">
								<div className="w-[100px] h-[100px]">
									<LazyLoadImage
										src={c?.prodImg}
										alt="prodImage.jpg"
										className="w-[100px] h-[100px] object-cover"
									/>
								</div>
								<div className="flex flex-col gap-2 justify-center">
									<p className="opacity-80">{c?.prodName}</p>
									<p className="text-[13px] opacity-70">Rs. {c?.sellingPrice} /-</p>
								</div>
							</div>
							{
								<div className="flex items-center justify-center">
									<button
										className="bg-primary text-white rounded-tl-md rounded-bl-md w-6 h-6"
										onClick={() => changeQty(c?._id, c?.quantity - 1)}
									>
										-
									</button>
									<div className="bg-white w-[150px] text-center border outline-none">{c?.quantity}</div>

									<button
										className="bg-primary text-white text-center rounded-tr-md rounded-br-md w-6 h-6"
										onClick={() => changeQty(c?._id, c?.quantity + 1)}
									>
										+
									</button>
								</div>
							}
						</div>
					))}
				</div>

				<div className="col-span-4 max-[900px]:col-span-12 max-[900px]:order-first bg-white h-[200px] flex flex-col justify-between border rounded-md shadow p-4">
					<div>
						<p className="text-[25px] opacity-60">Total Amount</p>
						<p className="text-primary">Rs. {amount} /-</p>
						<p className="text-primary">
							Total items &nbsp;
							{cart.length}{" "}
						</p>
					</div>
					{loading ? (
						<button className="bg-orange-500 text-white px-10 py-2 flex justify-center items-center rounded-md shadow">
							<Loader isWhite={true} />
						</button>
					) : (
						<button
							onClick={() => paymentHandler()}
							className="bg-orange-500 text-white px-10 py-2 rounded-md shadow"
						>
							Proceed
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default Cart
