export const titleCasePipe = (val: string | undefined) => {
	if (val && val.includes("_")) {
		val = val
			.split("_")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ")
	}
	return val?.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (match) => match.toUpperCase())
}

export const dateFormat = (dateStr: Date) => {
	if (dateStr) {
		const date = new Date(dateStr)
		const options: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
		const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date)
		return formattedDate
	}
}
