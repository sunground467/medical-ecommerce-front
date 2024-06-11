import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { dateFormat, titleCasePipe } from "../../pipes/pipes"
import { ColumnType } from "../../component/enums/enum"
import Form from "../../reusable/form"
import { FormField } from "../../component/interface/all-interface"
import { updatedOrderForm } from "./form"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { updateOrderStatus } from "../../redux/action/orderAction"

const SingleOrder = () => {
	const location = useLocation()
	const [orderForm, setOrderForm] = useState<FormField[]>(updatedOrderForm)
	const { loading } = useAppSelector((state) => state.orders)
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
	const dispatch = useAppDispatch()

	const updateOrder = (form: any) => {
		dispatch(updateOrderStatus(form))
	}

	useEffect(() => {
		const updatedForm = orderForm.map((o) => {
			if (o.fieldName === "id") {
				return {
					...o,
					value: location.state?._id
				}
			} else if (o.fieldName === "orderStatus") {
				return {
					...o,
					value: location.state?.orderStatus
				}
			} else if (o.fieldName === "paymentStatus") {
				return {
					...o,
					value: location.state?.paymentStatus
				}
			} else {
				return {
					...o
				}
			}
		})
		setOrderForm(updatedForm)
	}, [location.state])

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

			<div className="col-span-12">
				<Form
					formData={orderForm}
					title="Update order details"
					loading={loading}
					btnName="Update"
					submiteFormEvent={updateOrder}
					takeFieldValue={true}
				/>
			</div>
		</div>
	)
}

export default SingleOrder
