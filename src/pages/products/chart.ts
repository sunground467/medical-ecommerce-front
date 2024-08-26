export const availableOutOfStock = (unExpired: number, expired: number) => {
	return {
		labels: ["UnExpired Stock", "Expired Stock"],
		datasets: [
			{
				label: "",
				data: [unExpired, expired],
				backgroundColor: ["#ffa07a", "lightblue"],
				barPercentage: 1
			}
		]
	}
}
