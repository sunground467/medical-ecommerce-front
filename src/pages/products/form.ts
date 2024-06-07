import { InputType } from "../../component/enums/enum"
import { FormField, ValidatorsType } from "../../component/interface/all-interface"

export const productForm: FormField[] = [
	{
		label: "Product name",
		fieldName: "prodName",
		inputType: InputType.TEXT,
		placeHolder: "Enter Product name",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "Enter product name"
			}
		]
	},
	{
		label: "Brand name",
		fieldName: "brandName",
		inputType: InputType.TEXT,
		placeHolder: "Enter Product name",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "Enter product name"
			}
		]
	},
	{
		label: "Category",
		fieldName: "categoryName",
		inputType: InputType.DROPDOWN,
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "Field is Required"
			}
		],
		options: []
	},
	{
		label: "Is Prescription",
		fieldName: "isPrescription",
		inputType: InputType.DROPDOWN,
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "Field is Required"
			}
		],
		// value:true,
		options: [
			{
				label: "Yes",
				value: true
			},
			{
				label: "No",
				value: false
			}
		]
	},
	{
		label: "Is Discount",
		fieldName: "isDiscount",
		inputType: InputType.DROPDOWN,
		className:'col-span-12',
		options: [
			{
				label: "Yes",
				value: true
			},
			{
				label: "No",
				value: false
			}
		]
	},
	{
		label: "Discount Percentage",
		fieldName: "discountPerCentage",
		inputType: InputType.NUMBER,
		placeHolder: "Enter discount percentage"
	},
	{
		label: "Cost price",
		fieldName: "costPrice",
		inputType: InputType.NUMBER,
		placeHolder: "Enter Cost Price",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "Field is Required"
			}
		]
	},
	{
		label: "MRP Rate",
		fieldName: "mrpRate",
		inputType: InputType.NUMBER,
		placeHolder: "Enter MRP Rate",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "Field is Required"
			}
		]
	},
	{
		label: "Selling price",
		fieldName: "sellingPrice",
		inputType: InputType.NUMBER,
		placeHolder: "Enter Selling Price",
		value: "",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "Field is Required"
			}
		]
	},

	{
		label: "Product Image",
		fieldName: "prodImg",
		className: "col-span-12",
		inputType: InputType.IMAGE,
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "image is Required"
			}
		]
	}
]

export const nestedProductForm: FormField[] = [
	{
		label: "Product id",
		fieldName: "productId",
		inputType: InputType.TEXT,
		placeHolder: "",
		value: "",
		className: "col-span-6"
	},
	{
		label: "Product Name",
		fieldName: "prodName",
		inputType: InputType.TEXT,
		placeHolder: "",
		value: "",
		className: "col-span-6"
	},
	{
		label: "Quantity",
		fieldName: "quantity",
		inputType: InputType.NUMBER,
		placeHolder: "Enter quantity",
		value: 0,
		className: "col-span-6",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "Field is Required"
			}
		]
	},
	{
		label: "Menufacture Date",
		fieldName: "manufactureDate",
		inputType: InputType.DATE,
		placeHolder: "Enter maanufacture date",
		className: "col-span-6",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "Field is Required"
			}
		]
	},
	{
		label: "Expiry Date",
		fieldName: "expiryDate",
		inputType: InputType.DATE,
		placeHolder: "Enter maanufacture date",
		className: "col-span-6",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "Field is Required"
			}
		]
	}
]
