import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { dateFormat, titleCasePipe } from "../../pipes/pipes"
import { ColumnType } from "../../component/enums/enum"

const SingleOrder = () => {
	const location = useLocation()
	const [obj, setObj] = useState({
		_id: "",
		prescriptionImg: ColumnType.IMAGE,
		userId: "",
		fullName: "",
		userMobile: 0,
		userEmail: "",
		city: "",
		country: "",
		state: "",
		street: "",
		pincode: "",
		orderStatus: "",
		totalAmount: 0,
		paymentStatus: "",
		paidAt: ColumnType.DATE,
		createdAt: ColumnType.DATE,
		updatedAt: ColumnType.DATE,
		orderItems: []
	})

	useEffect(() => {
		const updateObj = {
			...obj,
			orderItems: location.state?.orderItems.map((o: any) => ({
				prodImg: ColumnType.IMAGE,
				prodName: o?.prodName,
				brandName: o?.brandName,
				quantity: o?.quantity
			}))
		}
		setObj(updateObj)
	}, [])

	return (
		<div className="grid grid-cols-12 bg-white  rounded-md shadow mb-16 gap-7 m-5 p-5">
			{Object.entries(obj).map(([keys, val]: any, index) => (
				<div
					className={`${Array.isArray(val) ? "col-span-12 flex flex-col justify items-start" : "col-span-6 flex justify-between items-start"} font-semibold  px-10 gap-2`}
					key={index}
				>
					<label className="w-[200px] font-semibold flex justify-between" htmlFor="">
						<p>{titleCasePipe(keys)}</p> <b>:</b>{" "}
					</label>
					{Array.isArray(val) ? (
						<div className="flex flex-wrap gap-8">
							{val.map((item, i) => (
								<div key={i} className=" flex flex-col w-[300px] gap-4 justify-center items-start">
									{Object.entries(item).map(([itemKey, itemVal]: any) => (
										<div className="flex gap-2" key={itemKey}>
											<label>{titleCasePipe(itemKey)}</label>:{" "}
											{itemVal === ColumnType.IMAGE ? (
												<a href={location.state[keys][i][itemKey].url} target="_blank">
													<img
														src={location.state[keys][i][itemKey].url}
														alt={"image"}
														className="w-[50px] object-contain h-[50px]"
													/>
												</a>
											) : (
												<p>{location.state[keys][i][itemKey]} </p>
											)}
										</div>
									))}
								</div>
							))}
						</div>
					) : val === ColumnType.IMAGE ? (
						<a href={location.state[keys]} target="_blank">
							<img src={location.state[keys]} alt={"image"} className="w-[50px] object-contain h-[50px]" />
						</a>
					) : (
						<p> {val === ColumnType.DATE ? dateFormat(location.state[keys]) : location.state[keys]}</p>
					)}
				</div>
			))}
		</div>
	)
}

export default SingleOrder
