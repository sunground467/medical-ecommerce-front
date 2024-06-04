// import { Category } from "../../enums/enum"
// import { Products } from "../../interface/all-interface"

// export const generateMonthlyStock = (totalStock: number, tillMonth: number) => {
// 	let remainStock = totalStock
// 	let monthlyStock: number[] = Array(tillMonth).fill(0)

// 	for (let i = 0; i < tillMonth - 1; i++) {
// 		const maxAllocation = Math.min(remainStock, 150)
// 		const minAllocation = Math.max(100, maxAllocation - 50)
// 		let allocatedStock = Math.floor(Math.random() * (maxAllocation - minAllocation + 1)) + minAllocation
// 		allocatedStock = Math.max(0, allocatedStock)
// 		monthlyStock[i] += allocatedStock
// 		remainStock -= allocatedStock
// 	}

// 	remainStock = Math.max(0, remainStock)
// 	monthlyStock[tillMonth - 1] = remainStock

// 	return monthlyStock
// }

// const createdProdInMonth = (prodName: number[]) => {
// 	let numArr = []
// 	for (let i = 0; i < prodName.length; i++) {
// 		numArr.push(prodName[i])
// 	}
// 	return numArr
// }

// const totalProdCreatedInMonths = (tv: number[], phone: number[], cloths: number[], lappy: number[], shoe: number[]) => {
// 	let tempArr: number[][] = []
// 	let totalProdVal: number[] = []

// 	for (let i = 0; i < 12; i++) {
// 		const element = [tv[i], phone[i], cloths[i], lappy[i], shoe[i]]
// 		tempArr.push(element)
// 	}

// 	for (let i = 0; i < tempArr.length; i++) {
// 		const totalVal: number = tempArr[i].reduce((acc, curr) => acc + curr, 0)
// 		totalProdVal.push(totalVal)
// 	}
// 	sessionStorage.setItem("totalProdCount", JSON.stringify(totalProdVal))
// 	return totalProdVal
// }

// export const barChartData = (prod: Products[]) => {
// 	let tv = generateMonthlyStock(Number(prod.filter((p) => p.prod_name === Category.TV)[0]?.stock), 12)
// 	let phone = generateMonthlyStock(Number(prod.filter((p) => p.prod_name === Category.PHONE)[0]?.stock), 12)
// 	let cloths = generateMonthlyStock(Number(prod.filter((p) => p.prod_name === Category.CLOTHS)[0]?.stock), 12)
// 	let lappy = generateMonthlyStock(Number(prod.filter((p) => p.prod_name === Category.LAPTOP)[0]?.stock), 12)
// 	let shoe = generateMonthlyStock(Number(prod.filter((p) => p.prod_name === Category.SHOE)[0]?.stock), 12)

// 	totalProdCreatedInMonths(tv, phone, cloths, lappy, shoe)

// 	const shuffelColor = (array: string[]) => {
// 		for (let i = array.length - 1; i > 0; i--) {
// 			const j = Math.floor(Math.random() * (i + 1))
// 			;[array[i], array[j]] = [array[j], array[i]]
// 		}
// 		return array
// 	}

// 	return {
// 		labels: ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sept", "Nov", "Dec"],
// 		datasets: [
// 			{
// 				label: "Tv",
// 				data: createdProdInMonth(tv),
// 				backgroundColor: shuffelColor(["rgb(255, 99, 132)"]),
// 				borderRadius: 250,
// 				barPercentage: 0.6
// 			},
// 			{
// 				label: "Phone",
// 				data: createdProdInMonth(phone),
// 				backgroundColor: shuffelColor(["rgb(75, 192, 192)"]),
// 				borderRadius: 250,
// 				barPercentage: 0.6
// 			},
// 			{
// 				label: "Cloths",
// 				data: createdProdInMonth(cloths),
// 				backgroundColor: shuffelColor(["rgb(255, 205, 86)"]),
// 				borderRadius: 250,
// 				barPercentage: 0.6
// 			},
// 			{
// 				label: "Laptop",
// 				data: createdProdInMonth(lappy),
// 				backgroundColor: shuffelColor(["rgb(201, 203, 207)"]),
// 				borderRadius: 250,
// 				barPercentage: 0.6
// 			},
// 			{
// 				label: "Shoes",
// 				data: createdProdInMonth(shoe),
// 				backgroundColor: shuffelColor(["rgb(54, 162, 235)"]),
// 				borderRadius: 250,
// 				barPercentage: 0.6
// 			}
// 		]
// 	}
// }

// export const lineChartData = () => {
// 	return {
// 		labels: ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sept", "Nov", "Dec"],
// 		datasets: [
// 			{
// 				label: "My First Dataset",
// 				data: JSON.parse(sessionStorage.getItem("totalProdCount") as string),
// 				backgroundColor: ["#6a73fa", "#6a73fa", "#6a73fa", "#6a73fa", "lightblue"],
// 				borderColor: ["#6a73fa"],
// 				barPercentage: 0.2
// 			}
// 		]
// 	}
// }
