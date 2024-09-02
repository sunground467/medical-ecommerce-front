import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { getAllSales } from "../../redux/action/orderAction"
import { lineChartData } from "./chart"
import Chart from "../../reusable/chart"

const AllSales = () => {
	const { allSales } = useAppSelector((state) => state.orders)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(getAllSales())
	}, [dispatch])
	return (
		<div className="grid grid-cols-12 gap-4 pb-16 p-4">
			<div className="col-span-12 relative">
				<Chart title="Total Sales In Months " chartName="line" height="h-[400px]" chartData={lineChartData(allSales)} />
			</div>
		</div>
	)
}

export default AllSales
