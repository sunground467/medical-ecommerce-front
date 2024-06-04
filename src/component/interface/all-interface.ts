import { ColumnType, InputType } from "../enums/enum"

export interface SideNavType {
	label: string
	route?: string
	isActive?: boolean
	children?: Array<{
		label: string
		route: string
	}>
}

export interface Products {
	id: string
	prod_name: string
	prodImg: string
	stock: number
	price: number
}

export interface Users {
	id: string
	name: string
	img: string
	gender: String
	state: string
	mobile: string
	email: string
	address?: {
		street: string
		houseNo: number
		nestedAddres?: {
			street1: string
			houseNo1: number
		}
	}
}

export interface ColumnHeader {
	columnHeader: string
	propName: string
	className: string
	columnType: ColumnType
	isView: boolean
}

export interface FormField {
	label: string
	fieldName: string
	inputType: InputType
	options?: Array<{
		label: string
		value: string | boolean
	}>
	placeHolder?: string
	value?: string | number | boolean
	className?: string
	pattern?: any
	validators?: Validators[]
	error?: string
}

export enum ValidatorsType {
	REQUIRED = "REQUIRED",
	PATTERN = "PATTERN",
	SAME_FIELD = "SAME_FIELD"
}

export type Validators = RequiredValidator | PatternValidator | SameFieldValidator

export interface RequiredValidator {
	type: ValidatorsType.REQUIRED
	msg: string
}
export interface PatternValidator {
	type: ValidatorsType.PATTERN
	pattern: string
	msg: string
}
export interface SameFieldValidator {
	type: ValidatorsType.SAME_FIELD
	fieldName: string
	msg: string
}
