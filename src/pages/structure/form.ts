import { InputType } from "../../component/enums/enum"
import { FormField, ValidatorsType } from "../../component/interface/all-interface"

export const createCategoryTitle: FormField[] = [
	{
		label: "Category Title",
		fieldName: "categoryTitle",
		inputType: InputType.TEXT,
		placeHolder: "Enter category title",
		className: "col-span-12",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "Field is required * "
			}
		]
	}
]
export const createSubCategoryForm: FormField[] = [
	{
		label: "Category main title",
		fieldName: "forCategoryMainTitle",
		inputType: InputType.DROPDOWN,
		className: "col-span-12",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "Field is required * "
			}
		],
		options: []
	},
	{
		label: "Sub Category name",
		fieldName: "subcategoryName",
		inputType: InputType.TEXT,
		placeHolder: "Enter sub category name",
		className: "col-span-12",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "Field is required * "
			}
		]
	},
	{
		label: "Upload Image",
		fieldName: "subcategoryImg",
		inputType: InputType.IMAGE,
		placeHolder: "Enter subcategory title",
		className: "col-span-12",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "Field is required * "
			}
		]
	}
]

export const updateCategoryTitle: FormField[] = [
	{
		label: "Category Title",
		fieldName: "categoryTitle",
		inputType: InputType.TEXT,
		placeHolder: "Enter category title",
		className: "col-span-12"
	}
]

export const updateSubCategoryForm: FormField[] = [
	{
		label: "Sub Category name",
		fieldName: "subcategoryName",
		inputType: InputType.DROPDOWN,
		placeHolder: "Enter sub category name",
		pattern: /[^a-zA-Z]/g,
		className: "col-span-12",
		options: []
	},
	{
		label: "Upload Image",
		fieldName: "subcategoryImg",
		inputType: InputType.IMAGE,
		placeHolder: "Enter subcategory title",
		pattern: /[^a-zA-Z]/g,
		className: "col-span-12"
	}
]
