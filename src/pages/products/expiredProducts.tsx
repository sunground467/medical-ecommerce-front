import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { getExpiredProduct } from "../../redux/action/productAction"
import { dateFormat } from "../../pipes/pipes"
import { DotsLoader } from "../../reusable/DotsLoader"

const ExpiredProducts = () => {
	const { expiredProduct, loading } = useAppSelector((state) => state.product)
	const [index, setIndex] = useState<number>()

	const dispatch = useAppDispatch()
	const [expireState] = useState<any[]>([
		{
			label: "Expire in 10 Days",
			value: 10
		},
		{
			label: "Expire in 5 Days",
			value: 5
		},
		{
			label: "Expire tommorow",
			value: 1
		},
		{
			label: "Expired Now",
			value: 0
		}
	])

	const getExpiryData = (i: number) => {
		setIndex(i)
		dispatch(getExpiredProduct(expireState[i]?.value))
	}

	useEffect(() => {
		getExpiryData(0)
		setIndex(0)
	}, [])

	return (
		<div className="w-full">
			<div className="grid grid-cols-12  border-black">
				{expireState.map((ex: any, i: number) => (
					<button
						onClick={() => getExpiryData(i)}
						key={i}
						className={`border col-span-3 w-full text-center py-2 cursor-pointer ${i === index ? "bg-primary text-white" : "bg-white text-black"}`}
					>
						{ex?.label}
					</button>
				))}
			</div>
			<div className={`grid grid-cols-12 gap-4 ${loading ? "" : "p-4"}`}>
				{loading ? (
					<div className=" bg-black bg-opacity-40 flex justify-center items-center col-span-12 h-[85vh]">
						<div className="">
							<DotsLoader />
						</div>
					</div>
				) : (
					expiredProduct.map((ex: any) => (
						<div key={ex?._id} className="bg-white rounded-md shadow p-4 flex flex-col gap-4 col-span-4">
							<p className="opacity-70 font-bold">{ex?.prodName}</p>
							<p className="opacity-70 font-bold">Qty: {ex?.quantity}</p>
							<p className="opacity-70 font-bold">Manufacture Date: {dateFormat(ex?.manufactureDate)}</p>
							<p className="opacity-70 font-bold">Expiry Date: {dateFormat(ex?.expiryDate)}</p>
						</div>
					))
				)}

				<p className="col-span-12 text-center pt-10 opacity-70 font-bold">
					{" "}
					{!loading && !expiredProduct.length ? "No Data found" : null}
				</p>
			</div>
		</div>
	)
}

export default ExpiredProducts
