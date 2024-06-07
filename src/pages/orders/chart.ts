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
