import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { CartType } from "../../../component/enums/enum"
import { getAllProducts } from "../../../redux/action/productAction"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import LazyLoadImage from "../../../reusable/LazyLoadImage"
import Loader from "../../../component/Loader/Loader"

const CategoryProd = () => {
	const dispatch = useAppDispatch()
	const location = useLocation()
	const navigate = useNavigate()
	const { allProducts, loading } = useAppSelector((state) => state.product)
	const { cart } = useAppSelector((state) => state.cart)
	useEffect(() => {
		const queryParams = new URLSearchParams(location.search)
		const categoryName = queryParams.get("category") as string
		if (categoryName) dispatch(getAllProducts("", 1, 10, categoryName))
	}, [])

	const addToCart = (data: any) => {
		dispatch({
			type: CartType.ADD_CART,
			payload: { data }
		})
	}

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

	return loading ? (
		<div className="w-full flex justify-center items-center h-[500px]">
			<Loader />
		</div>
	) : (
		<div className="w-full py-14 flex justify-center items-center">
			<div className="w-[90%] p-10 max-sm:p-5 bg-white rounded-xl">
				<div className="grid grid-cols-12 gap-4 max-sm:gap-3">
					{allProducts?.map((prod) => (
						<div
							key={prod?._id}
							className="col-span-3 max-lg:col-span-4 max-md:col-span-6 max-sm:col-span-12 h-[350px] p-4 flex  flex-col justify-between items-start rounded-md shadow-md"
						>
							<div className="w-full relative flex justify-center items-center h-[150px] mb-4">
								<div onClick={() => navigate(`/singleProd/${prod?._id}`)}>
									<LazyLoadImage
										src={prod?.prodImg}
										className="w-[150px] h-[150px] object-contain"
										alt={prod?.prodName}
									/>
								</div>
								{prod?.isDiscount ? (
									<div className="absolute  top-[-25px] left-[-25px]">
										<div>
											<LazyLoadImage
												src="/images/discount-bg.png"
												className="w-14 object-cover h-14"
												alt="discount.png"
											/>
											<p className="absolute top-4 left-4 text-white text-[18px]">
												{prod?.discountPerCentage}%
											</p>
										</div>
									</div>
								) : !prod?.stock ? (
									<div className="absolute  top-[-25px] left-[-25px]">
										<div>
											<LazyLoadImage
												src="/images/outofstock.png"
												className="w-14 object-cover h-14"
												alt="outOfStock.png"
											/>

											<p className="absolute top-6 left-6 text-white text-[22px]">
												{prod?.discountPerCentage}%
											</p>
										</div>
									</div>
								) : null}
							</div>
							<div className="flex h-[70px] flex-col items-start">
								<p> {prod?.prodName} </p>
								<p> Rs. {prod?.sellingPrice} /- </p>
								{prod?.isDiscount ? (
									<p className="text-[12px] py-1 text-black opacity-80">
										You save Rs. {prod?.mrpRate - prod?.sellingPrice} /-{" "}
									</p>
								) : null}
							</div>

							<div className="w-full">
								{cart?.find((c) => c?._id === prod?._id) ? (
									cart?.map((c) =>
										c?._id === prod?._id ? (
											<div key={c?._id} className="flex justify-between items-center">
												<button
													onClick={() => changeQty(c?._id, c?.quantity - 1)}
													className="bg-primary w-[45px] h-[30px]  rounded-tl-md  rounded-bl-md text-white text-center"
												>
													-
												</button>
												<input
													type="text"
													value={c?.quantity}
													className="border text-center outline-none h-[30px] border-primary"
												/>
												<button
													onClick={() => changeQty(c?._id, c?.quantity + 1)}
													className="bg-primary w-[45px] h-[30px]  rounded-tr-md  rounded-br-md text-white text-center"
												>
													+
												</button>
											</div>
										) : null
									)
								) : (
									<button
										onClick={() => addToCart(prod)}
										className="bg-primary w-full mt-2 px-6 py-2 rounded-md text-white text-center"
									>
										+ Add To Cart
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default CategoryProd
