import { ChangeEvent, useEffect, useState } from "react"
import { MdModeEdit } from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom"
import axiosInstance from "../../../component/interceptor/interceptor"
import { FormField } from "../../../component/interface/all-interface"
import Loader from "../../../component/Loader/Loader"
import { myProfile, updateMyProfile } from "../../../redux/action/userAction"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import Form from "../../../reusable/form"
import LazyLoadImage from "../../../reusable/LazyLoadImage"
import { updateProfile } from "./form"
import { getMyOrderlist } from "../../../redux/action/orderAction"
import { toast } from "react-toastify"

const MyOrder = ({ myOrderList, loading }: { myOrderList: any[]; loading: boolean }) => {
	const [btnLoading, setBtnLoading] = useState(false)

	const handleCancelRequest = async (orderId: string) => {
		try {
			setBtnLoading(true)
			await axiosInstance.patch(`/cancel-order/${orderId}`)
			setBtnLoading(false)
		} catch (error) {
			console.log(error)
			setBtnLoading(false)
		}
	}
	return loading ? (
		<Loader />
	) : (
		<div className="w-full bg-white shadow-md h-fit p-4">
			<div className="space-y-4">
				{myOrderList?.length > 0 ? (
					myOrderList.map((order) => (
						<div
							key={order._id}
							className="p-4 bg-white border border-gray-300 rounded-md shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
						>
							<div className="flex flex-col space-y-2">
								<div className="text-lg font-semibold">Invoice No: {order.invoiceNo}</div>
								<div className="text-gray-700">Total Amount: ₹{order.totalAmount}</div>
								<div className="text-gray-500">
									Status:{" "}
									<span
										className={`${order.orderStatus === "delivered" ? "text-green-500" : "text-orange-500"}`}
									>
										{order.orderStatus}
									</span>
								</div>
								<div className="text-gray-500">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</div>
								<div className="text-gray-500">
									Delivery Address: {order.street}, {order.city}, {order.state}, {order.pincode}
								</div>
							</div>

							<div className="mt-4 md:mt-0 md:ml-4 flex-shrink-0">
								{order?.orderStatus !== "delivered" &&
									order?.orderStatus !== "canceled" &&
									(btnLoading ? (
										<button className="px-4 py-2 flex justify-center items-center bg-red-500 text-white w-[220px] rounded-md shadow hover:bg-red-600 focus:outline-none">
											<Loader isWhite={true} />
										</button>
									) : (
										<button
											className="px-0 py-2 bg-red-500 w-[230px] text-white rounded-md shadow hover:bg-red-600 focus:outline-none"
											onClick={() => handleCancelRequest(order?._id)}
										>
											Request For Cancellation
										</button>
									))}
							</div>
						</div>
					))
				) : (
					<div className="text-gray-600">No orders found.</div>
				)}
			</div>
		</div>
	)
}

const UpdateMyProfile = () => {
	const { user, loading } = useAppSelector((state) => state.users)
	const [userForm, setUserForm] = useState<FormField[]>(updateProfile)

	const dispatch = useAppDispatch()

	const submitFormEvent = (form: any) => {
		let formObj: any = {}
		for (const key in form) {
			if (user[key] !== form[key]) formObj[key] = form[key]
		}
		dispatch(updateMyProfile(formObj))
	}

	useEffect(() => {
		const updatedNewForm = userForm.map((field: FormField) => {
			if (field.fieldName === "_id") {
				return {
					...field,
					className: "block col-span-12 max:sm-col-span-12"
				}
			} else {
				return {
					...field
				}
			}
		})
		setUserForm(updatedNewForm)
	}, [])

	const handleImageChange = async (e: ChangeEvent<HTMLInputElement>, method: string) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0]
			const reader = await new FileReader()
			reader.onloadend = async () => {
				if (reader.result) {
					const url = method === "profilePic" ? "/updateProfilePic" : "/updatePrescription"
					await axiosInstance.patch(url, {
						file: reader.result
					})
				}
			}
			reader.readAsDataURL(file)
		}
		await dispatch(myProfile())
	}

	return (
		<div className="w-full flex flex-col py-2 items-center h-fit bg-white">
			<div className="relative">
				<LazyLoadImage
					src={
						user?.profileImg?.URL ? user?.profileImg?.URL : "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
					}
					className="w-[200px] max-sm:w-[150px] h-[200px] max-sm:h-[150px] object-cover rounded-full shadow-md"
					alt="userImg.jpg"
				/>
				<div className="absolute bottom-4 right-2 cursor-pointer">
					<label htmlFor="profileImageInput">
						<MdModeEdit cursor={"pointer"} fontSize={24} color="#3b82f6" />
					</label>
					<input
						type="file"
						id="profileImageInput"
						accept="image/*"
						className="hidden"
						onChange={(e) => handleImageChange(e, "profilePic")}
					/>
				</div>
			</div>
			<div
				className={`w-[90%] pb-5 max-sm: py-5 flex ${user?.prescriptionImg?.URL ? "justify-between" : "justify-end"} items-center`}
			>
				{user?.prescriptionImg?.URL ? (
					<LazyLoadImage
						src={user?.prescriptionImg?.URL}
						className="w-[200px] h-[200px] object-contain rounded-full shadow-md"
						alt="userImg.jpg"
					/>
				) : null}
				<div className="cursor-pointer">
					<label
						htmlFor="prescriptionImageInput"
						className="bg-primary px-6 py-2 cursor-pointer rounded-md text-white text-center"
					>
						Upload Prescription{" "}
					</label>
					<input
						type="file"
						id="prescriptionImageInput"
						accept="image/*"
						className="hidden"
						onChange={(e) => handleImageChange(e, "prescription")}
					/>
				</div>
			</div>
			<div className="w-[90%]">
				<Form
					formData={userForm}
					title="Update My Profile"
					loading={loading}
					submitFormEvent={submitFormEvent}
					formValueObj={user}
				/>
			</div>
		</div>
	)
}

const MyProfile = () => {
	const [showComponent, setShowComponent] = useState<any>({
		profile: true,
		myOrder: false
	})

	const { myOrderList, loading } = useAppSelector((state) => state.orders)
	const { accessToken } = useAppSelector((state) => state.users)
	const dispatch = useAppDispatch() // Destructure `myOrder` from the state
	const location = useLocation() // Destructure `myOrder` from the state
	const navigate = useNavigate() // Destructure `myOrder` from the state

	useEffect(() => {
		if (!accessToken) {
			toast.error("Please Login First")
			return navigate("/login")
		}
	}, [accessToken])

	useEffect(() => {
		if (location?.state?.myOrder) {
			setShowComponent({
				profile: false,
				myOrder: true
			})
		}
	}, [location?.state])

	useEffect(() => {
		dispatch(getMyOrderlist())
	}, [])
	return (
		<div className="w-full flex justify-center items-center py-10">
			<div className="w-[70%] max-sm:w-[90%]">
				<div className="grid bg-white rounded-xl shadow-md grid-cols-12">
					<button
						onClick={() => setShowComponent((prev: any) => ({ ...prev, profile: true, myOrder: false }))}
						className={`col-span-6 ${showComponent?.profile ? "bg-primary text-white" : "bg-white text-black"} px-6 py-2  text-center`}
					>
						My Profile
					</button>
					<button
						onClick={() => setShowComponent((prev: any) => ({ ...prev, myOrder: true, profile: false }))}
						className={`col-span-6 ${showComponent?.myOrder ? "bg-primary text-white" : "bg-white text-black"} px-6 py-2  text-center`}
					>
						My Order
					</button>
				</div>
				{showComponent?.profile && <UpdateMyProfile />}
				{showComponent?.myOrder && <MyOrder loading={loading} myOrderList={myOrderList} />}
			</div>
		</div>
	)
}

export default MyProfile
