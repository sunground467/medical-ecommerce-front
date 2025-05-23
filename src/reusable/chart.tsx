import { Chart as ChartJS, registerables } from "chart.js"
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2"
import { ChartTypeEnum } from "../component/enums/enum"
import { useEffect } from "react"
ChartJS.register(...registerables)
const Chart = ({
	title,
	chartName,
	height,
	chartData,
	labelValue
}: {
	title: string
	chartName: string
	height: string
	chartData: any
	labelValue?: boolean
}) => {
	const textCenter = {
		id: "textCenter",
		beforeDatasetsDraw(chart: any) {
			const { ctx, data } = chart
			let total = data.datasets[0].data.reduce((acc: number, curr: number) => acc + curr, 0)
			ctx.save()
			ctx.font = "22px Poppins"
			ctx.fillStyle = "black"
			ctx.textAlign = "center"
			ctx.textBaseline = "middle"

			ctx.fillText(`Total ${total}`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y)
		}
	}

	const createChartType = () => {
		if (chartName === ChartTypeEnum.BAR) {
			return (
				<Bar
					data={chartData}
					width={"100%"}
					options={{ maintainAspectRatio: false, responsive: true, plugins: { legend: { display: true } } }}
				/>
			)
		} else if (chartName === ChartTypeEnum.LINE) {
			return (
				<Line
					data={chartData}
					width={"100%"}
					options={{
						maintainAspectRatio: false,
						responsive: true,
						plugins: { legend: { display: labelValue ? labelValue : false } },
						scales: {
							y: {
								ticks: {
									callback: function (value: string | number) {
										if (Number.isInteger(value)) {
											return value
										}
									}
								}
							}
						}
					}}
				/>
			)
		} else if (chartName === ChartTypeEnum.PIE) {
			return (
				<Pie
					data={chartData}
					width={"100%"}
					options={{
						maintainAspectRatio: false,
						responsive: true,
						offset: [20, 30, 30, 60],
						plugins: { legend: { display: true } }
					}}
				/>
			)
		} else if (chartName === ChartTypeEnum.DOUGHNUT) {
			return (
				<Doughnut
					data={chartData}
					width={"100%"}
					options={{
						maintainAspectRatio: false,
						responsive: true,
						offset: [20, 30, 30, 100],
						cutout: "70%",
						plugins: { legend: { display: true } }
					}}
					plugins={[textCenter]}
				/>
			)
		}
	}

	useEffect(() => {
		if (chartData) {
			createChartType()
		}
	}, [chartData])

	return (
		<div className={`w-full p-4 ${height} pb-8 rounded-md bg-white`}>
			<h2 className="text-primary">{title}</h2>
			{createChartType()}
		</div>
	)
}

export default Chart
