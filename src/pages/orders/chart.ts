export const lineChartData = (monthData: number[]) => {
	return {
		labels: ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sept", "Nov", "Dec"],
		datasets: [
			{
				label: "My First Dataset",
				data: monthData,
				backgroundColor: ["#6a73fa", "#6a73fa", "#6a73fa", "#6a73fa", "lightblue"],
				borderColor: ["#6a73fa"],
				barPercentage: 0.2
			}
		]
	}
}
export const weekslineChartData = (delivered:number[],ongoing:number[],pending:number[],) => {
	return {
		labels: ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		datasets: [
			{
				label: "Delivered",
				data: delivered,
				borderColor: ["#6a73fa"],
				barPercentage: 5.9
			},
			{
				label: "Pending",
				data: pending,
				borderColor: ["#FD0063"],
				barPercentage: 5.9
			},
			{
				label: "Ongoing",
				data: ongoing,
				borderColor: ["orange"],
				barPercentage: 5.9
			},
		]
	}
}
