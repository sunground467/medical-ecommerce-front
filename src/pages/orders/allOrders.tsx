import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ColumnType } from "../../component/enums/enum"
import { commonDeleteFunc } from "../../redux/action/commonAction"
import { getAllOrders, getOrdersByWeeks, returnCreatedAtData } from "../../redux/action/orderAction"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import Chart from "../../reusable/chart"
import Table from "../../reusable/table"
import { lineChartData, weekslineChartData } from "./chart"

const AllOrders = () => {
	const { allOrders, loading, createdAtData, perWeekOrder } = useAppSelector((state) => state.orders)
	const [search, setSearch] = useState<string>("")
	const [limit, setLimit] = useState<number>(5)
	const [page, setPage] = useState<number>(1)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const setPropValForLink = (val: any) => {
		const url = val?.key === "_id" ? `/dashboard/single-order/${val?.data?._id}` : `/dashboard/single-user/${val?.data?.userId}`
		navigate(url, { state: val?.data })
	}
	const getOrders = (val: any) => {
		dispatch(getAllOrders(val?.searchInput, val?.currentPage, val?.limit))
	}

	const deleteProductVal = (val: string) => {
		dispatch(commonDeleteFunc("", val))
	}

	const obj = {
		_id: "66601e423a5cfd488f2b6217",
		userId: "665ec5821a976f65d344ae9e",
		fullName: "sk Yadavanshi",
		userEmail: "mk@gmail.com",
		userMobile: 9993323416,
		country: "In",
		state: "Chhattisgarh",
		city: "Raigarh",
		pincode: "496001",
		street: "DAROGAPARA MASTA GALI",
		totalAmount: 8112,
		orderStatus: "pending",
		paidAt: "2024-06-05T08:13:42.967Z",
		paymentStatus: "processing",
		createdAt: "2024-06-05T08:13:54.743Z",
		updatedAt: "2024-06-05T08:13:54.743Z"
	}

	const customColumnsClass = {
		_id: { className: "w-[300px] text-center", isView: true },
		userId: { className: "w-[300px] text-center", isView: true },
		paidAt: { columnType: ColumnType.DATE },
		createdAt: { columnType: ColumnType.DATE },
		updatedAt: { columnType: ColumnType.DATE }
	}

	useEffect(() => {
		dispatch(getAllOrders("", 1, 10))
	}, [])

	useEffect(() => {
		dispatch(returnCreatedAtData())
	}, [])

	const getWeekDataFormat = (num: number) => {
		const now = new Date()

		// Function to get the start of the week (Monday)
		const getStartOfWeek = (date: any) => {
			const start = new Date(date)
			const day = start.getDay()
			const diff = start.getDate() - day + (day === 0 ? -6 : 1) - num // Adjust to get the start of the previous week
			start.setDate(diff)
			start.setHours(0, 0, 0, 0) // Set to start of the day
			return start
		}

		const startOfWeek = getStartOfWeek(now)

		// Generate the dates from Monday to Sunday of the previous week
		const weekDates = []
		for (let i = 0; i < 7; i++) {
			const currentDate = new Date(startOfWeek)
			currentDate.setDate(startOfWeek.getDate() + i)
			weekDates.push(currentDate)
		}

		return dispatch(getOrdersByWeeks(weekDates))
	}
	useEffect(() => {
		getWeekDataFormat(0)
	}, [])
	return (
		<div className="grid grid-cols-12 gap-4 pb-16 p-4">
			<div className="col-span-12">
				<Table
					title="All Orders"
					obj={obj}
					tableData={allOrders}
					customColumns={customColumnsClass}
					setPropValForLink={setPropValForLink}
					deleteVal={deleteProductVal}
					loading={loading}
					callApi={getOrders}
					page={page}
					setPage={setPage}
					limit={limit}
					setLimit={setLimit}
					searchInput={search}
					setSearchInputVal={setSearch}
				/>
			</div>
			<div className=" col-span-6 max-lg:col-span-12 relative">
				<Chart
					title="Orders Status In weeks "
					chartName="line"
					height="h-[400px]"
					chartData={weekslineChartData(perWeekOrder?.delivered, perWeekOrder?.ongoing, perWeekOrder?.pending)}
					labelValue={true}
				/>
				<div className="absolute top-3 right-10">
					<select
						onChange={(e) => getWeekDataFormat(Number(e.target.value))}
						className="bg-gray-200 outline-none px-4 py-1 rounded-md text-primary"
						name=""
						id=""
					>
						<option value="0">This Week</option>
						<option value="7">1 Week Ago</option>
						<option value="14">2 Weeks Ago</option>
					</select>
				</div>
			</div>
			<div className=" col-span-6 max-lg:col-span-12 relative">
				<Chart
					title="Total Orders Delivered In Months "
					chartName="line"
					height="h-[400px]"
					chartData={lineChartData(createdAtData?.monthsData)}
				/>
				<div className="absolute top-3 right-10">
					<select
						onChange={(e) => dispatch(returnCreatedAtData(e.target.value))}
						className="bg-gray-200 outline-none px-4 py-1 rounded-md text-primary"
						name=""
						id=""
					>
						{createdAtData?.yearContainer?.map((y: string) => (
							<option key={y} value={y}>
								{y}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	)
}

export default AllOrders
