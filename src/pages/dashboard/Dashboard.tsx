import { useEffect, useState } from "react"
import { AiFillProduct } from "react-icons/ai"
import { FaThumbsUp, FaTimesCircle, FaUsers, FaXbox } from "react-icons/fa"
import { GiConfirmed } from "react-icons/gi"
import { IoIosRefresh } from "react-icons/io"
import { IoTime } from "react-icons/io5"
import { MdAssignmentReturned, MdLocalShipping } from "react-icons/md"
import { getAllOrdersCount } from "../../redux/action/orderAction"
import { useAppDispatch, useAppSelector } from "../../redux/store"

const Dashboard = () => {
	const { ordersCount } = useAppSelector((state) => state.orders)
	const [startDate, setStartDate] = useState("")
	const [endDate, setEndDate] = useState("")
	const [oveview, setOverView] = useState<any[]>([])
	const [order, setOrder] = useState<any[]>([])

	const [orderStatic, setOrderStatic] = useState<any[]>([])

	const dispatch = useAppDispatch()

	useEffect(() => {
		setOrder([
			{
				icon: <FaXbox color="#F23E14" fontSize={25} />,
				label: "Total Order",
				value: ordersCount?.totalOrders
			},
			{
				icon: <IoTime color="orange" fontSize={25} />,
				label: "Pending",
				value: ordersCount?.pendingOrders
			},
			{
				icon: <GiConfirmed color="#FD0063" fontSize={25} />,
				label: "Confirmed",
				value: ordersCount?.confirmedOrders
			},
			{
				icon: <MdLocalShipping color="#6A45FE" fontSize={25} />,
				label: "Ongoing",
				value: ordersCount?.ongoingOrders
			},
			{
				icon: <FaThumbsUp color="#6A45FE" fontSize={25} />,
				label: "Delivered",
				value: ordersCount?.deliveredOrders
			},
			{
				icon: <FaTimesCircle color="red" fontSize={25} />,
				label: "Canceled",
				value: ordersCount?.cancelOrders
			},
			{
				icon: <MdAssignmentReturned color="#426EFE" fontSize={25} />,
				label: "Returned",
				value: ordersCount?.returnOrders
			},
			{
				icon: <FaTimesCircle color="red" fontSize={25} />,
				label: "Rejected",
				value: ordersCount?.rejectOrders
			}
		])
		setOrderStatic([
			{
				icon: <FaThumbsUp color="green" fontSize={25} />,
				label: "Delivered",
				colorCode: "green",
				value: Number(((ordersCount?.deliveredOrders * 100) / ordersCount?.totalOrders).toFixed(0))
			},
			{
				icon: <FaTimesCircle color="#6A45FE" fontSize={25} />,
				label: "Canceled",
				colorCode: "#6A45FE",
				value: Number(((ordersCount?.cancelOrders * 100) / ordersCount?.totalOrders).toFixed(0))
			},
			{
				icon: <FaTimesCircle color="red" fontSize={25} />,
				label: "Rejected",
				colorCode: "red",
				value: Number(((ordersCount?.rejectOrders * 100) / ordersCount?.totalOrders).toFixed(0))
			}
		])
		setOverView([
			{
				icon: <FaXbox color="#FD0063" fontSize={35} />,
				label: "Total Earning",
				colorCode: "#FD0063",
				value: ordersCount?.totalEarning
			},
			{
				icon: <FaUsers color="#6A45FE" fontSize={35} />,
				label: "Total Employers",
				colorCode: "#6A45FE",
				value: ordersCount?.totalEmployers
			},
			{
				icon: <AiFillProduct color="orange" fontSize={35} />,
				label: "Total Products",
				colorCode: "orange",
				value: ordersCount?.totalProducts
			},
			{
				icon: <FaUsers color="#426EFE" fontSize={35} />,
				label: "Total Costomers",
				colorCode: "#426EFE",
				value: ordersCount?.totalCostomers
			}
		])
	}, [Object.entries(ordersCount)?.length])

	useEffect(() => {
		const today = new Date()
		const year = today.getFullYear()
		const month = String(today.getMonth() + 1).padStart(2, "0")
		const day = String(today.getDate()).padStart(2, "0")
		setEndDate(`${year}-${month}-${day}`)
		setStartDate(`${year}-${month}-${day}`)
		dispatch(getAllOrdersCount(`${year}-${month}-${day}`, `${year}-${month}-${day}`))
	}, [])

	const getGreeting = () => {
		const currentHour = new Date().getHours()
		if (currentHour >= 6 && currentHour < 12) {
			return "Good Morning"
		} else if (currentHour >= 12 && currentHour < 18) {
			return "Good Afternoon"
		} else {
			return "Good Evening"
		}
	}

	useEffect(() => {
		getGreeting()
	}, [])
	return (
		<div className="w-full relative pb-20">
			<p className="text-primary p-4 text-[20px]">{getGreeting()}, Admin 😊</p>
			<p className="text-primary p-4 text-[20px]">Let's take an overview</p>

			<button onClick={() => dispatch(getAllOrdersCount(startDate, endDate))} className="absolute right-5 top-4">
				<IoIosRefresh fontSize={25} color="blue" />
			</button>

			<div className="grid grid-cols-12 px-2 gap-4">
				{oveview.map((d, i) => (
					<div
						key={i}
						style={{ background: `${d?.colorCode}` }}
						className={`col-span-3 max-xl:col-span-6 max-sm:col-span-12 rounded-md py-4 flex items-center justify-evenly max-sm:justify-between max-sm:px-8 gap-3`}
					>
						<div className="w-14 h-14 flex justify-center items-center rounded-full bg-white">{d?.icon}</div>
						<div>
							<p className="text-white text-[20px]">{d?.label}</p>
							<p className="text-white text-center pt-1 text-[20px]">
								{i === 0 ? "Rs." : ""} {d?.value} {i === 0 ? "/-" : ""}
							</p>
						</div>
					</div>
				))}
			</div>

			<div className="pt-14 flex max-sm:flex-col max-sm:gap-4 sm:items-center justify-between p-4">
				<p className="text-primary text-[20px]">Order Statics</p>
				<div className="flex h-[50px] items-center max-sm:flex-col gap-4 ">
					<div className="flex flex-col max-sm:w-full justify-center">
						<label htmlFor="start-date" className="text-[13px] text-primary">
							Select start date
						</label>
						<input
							className="date-input bg-white px-4 py-2 outline-none cursor-pointer border-none rounded-md text-primary"
							type="date"
							name=""
							id="start-date"
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
						/>
					</div>
					<div className="flex flex-col justify-center">
						<label htmlFor="end-date" className="text-[13px] text-primary">
							Select end date
						</label>
						<input
							className="date-input bg-white px-4 py-2 outline-none cursor-pointer border-none rounded-md text-primary"
							type="date"
							name=""
							id="end-date"
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
						/>
					</div>
					<div className="pt-4">
						<button
							onClick={() => dispatch(getAllOrdersCount(startDate, endDate))}
							className="bg-primary text-white px-4 py-2 rounded-md"
						>
							Apply
						</button>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-12 px-2 gap-4">
				{order.map((d, i) => (
					<div
						key={i}
						className={`col-span-3 max-xl:col-span-6 max-sm:col-span-12 bg-white shadow rounded-md py-4 flex max-sm:justify-between max-sm:px-10 items-center px-4 gap-3`}
					>
						<div className="w-14 h-14 flex justify-center items-center rounded-full bg-gray-200">{d?.icon}</div>
						<div>
							<p className="text-black opacity-70 text-[15px]">{d?.label}</p>
							<p className="text-black opacity-70 text-center pt-1 text-[15px]">{d?.value}</p>
						</div>
					</div>
				))}
			</div>

			<div className="grid grid-cols-12 pt-10 px-2 gap-4">
				{orderStatic.map((d, i) => (
					<div
						key={i}
						className="col-span-4 max-xl:col-span-12 flex gap-10 px-4 items-center bg-white shadow rounded-md py-4"
					>
						<div className="w-[50px]">
							<div className="w-14 h-14 flex justify-center items-center rounded-full bg-gray-200">{d.icon}</div>
						</div>
						<div className="w-full">
							<p className="text-black opacity-70 text-[15px]">
								{d?.label} ({isNaN(d?.value) ? 0 : d?.value})%
							</p>
							<div className="w-[100%] h-3 rounded-full bg-gray-200">
								<div
									style={{ background: `${d?.colorCode}`, width: `${d?.value}%` }}
									className={`h-full rounded-full`}
								></div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Dashboard
