import { Gender } from "../../component/enums/enum"

export const maleFemaleDate = (male: number, female: number) => {
	return {
		labels: [Gender.MALE, Gender.FEMALE],
		datasets: [
			{
				label: "",
				data: [male, female],
				backgroundColor: ["#ffa07a", "lightblue"],
				barPercentage: 1
			}
		]
	}
}
