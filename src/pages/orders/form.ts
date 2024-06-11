import { InputType, orderStatus, paymentStatus } from "../../component/enums/enum"
import { FormField } from "../../component/interface/all-interface"

export const updatedOrderForm: FormField[] = [
	{
		label: "Id",
		inputType: InputType.TEXT,
		fieldName: "id",
		className: "hidden",
        value:''
	},
	{
		label: "Order status",
		inputType: InputType.DROPDOWN,
		fieldName: "orderStatus",
		className: "col-span-12",
		options: [
			{
				label: "Pending",
				value: orderStatus.PENDING
			},
			{
				label: "Confirmed",
				value: orderStatus.CONFIRMED
			},
			{
				label: "On Going",
				value: orderStatus.ONGOING
			},
			{
				label: "Delivered",
				value: orderStatus.DELIVERED
			},
			{
				label: "Rejected",
				value: orderStatus.REJECTED
			},
			{
				label: "Returned",
				value: orderStatus.RETURNED
			}
		]
	},
	{
		label: "Payment status",
		inputType: InputType.DROPDOWN,
		className: "col-span-12",
		fieldName: "paymentStatus",
		value: "",
		options: [
			{
				label: "Processing",
				value: paymentStatus.PROCESSING
			},
			{
				label: "Paid",
				value: paymentStatus.PAID
			},
			{
				label: "Cancel",
				value: paymentStatus.CANCEL
			},
			{
				label: "Rejected",
				value: paymentStatus.REJECTED
			},
			{
				label: "Returned",
				value: paymentStatus.RETURNED
			}
		]
	}
]
