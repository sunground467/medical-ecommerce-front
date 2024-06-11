export enum InputType {
	TEXT = "text",
	MOBILE = "number",
	NUMBER = "number",
	EMAIL = "email",
	TEXTAREA = "textarea",
	DATE = "date",
	DROPDOWN = "dropdown",
	IMAGE = "file"
}

export enum ColumnType {
	ACTION = "action",
	IMAGE = "image",
	BOOLEAN = "boolean",
	DATE = "date"
}

export enum Role {
	USER = "user",
	MANAGER = "manager",
	BDE = "bde",
	ACCOUNTANT = "accountant",
	DEVELOPER = "developer",
	DESIGNER = "designer"
}

export enum Gender {
	MALE = "Male",
	FEMALE = "Female"
}

export enum ChartTypeEnum {
	PIE = "pie",
	BAR = "bar",
	DOUGHNUT = "doughnut",
	LINE = "line"
}

export enum orderStatus {
	PENDING = "pending",
	CONFIRMED = "confirmed",
	ONGOING = "ongoing",
	DELIVERED = "delivered",
	CANCELED = "canceled",
	RETURNED = "returned",
	REJECTED = "rejected"
}
export enum paymentStatus {
	PROCESSING = "processing",
	PAID = "paid",
	CANCEL = "cancel",
	RETURNED = "returned",
	REJECTED = "rejected"
}
