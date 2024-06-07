import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ColumnType } from "../../component/enums/enum"
import { commonDeleteFunc } from "../../redux/action/commonAction"
import { getAllOrders, returnCreatedAtData } from "../../redux/action/orderAction"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import Table from "../../reusable/table"
import Chart from "../../reusable/chart"
import { lineChartData } from "./chart"

const AllOrders = () => {
	const { allOrders, loading, loaded, createdAtData } = useAppSelector((state) => state.orders)
	const [search, setSearch] = useState<string>("")
	const [limit, setLimit] = useState<number>(5)
	const [page, setPage] = useState<number>(1)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const setPropValForLink = (val: any) => {
		const url = val?.key === "_id" ? `/single-order/${val?.data?._id}` : `/single-user/${val?.data?.userId}`
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
		if (!loaded) dispatch(getAllOrders("", 1, 5))
	}, [loaded])

	useEffect(() => {
		dispatch(returnCreatedAtData())
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
			<div className="col-span-12 relative">
				<Chart
					title="Total Orders Delivered In Months "
					chartName="line"
					height="h-[600px]"
					chartData={lineChartData(createdAtData?.monthsData)}
				/>
				<div className="absolute top-3 right-10">
					<select onChange={(e)=>dispatch(returnCreatedAtData(e.target.value))} className="bg-gray-200 outline-none px-4 py-1 rounded-md text-primary" name="" id="">
						{createdAtData?.yearContainer?.map((y: string) => (
							<option  key={y} value={y}>
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
