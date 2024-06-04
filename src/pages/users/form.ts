import { Gender, InputType, Role } from "../../component/enums/enum"
import { FormField, ValidatorsType } from "../../component/interface/all-interface"

export const addEmployee: FormField[] = [
	{
		label: "User Id",
		fieldName: "_id",
		inputType: InputType.TEXT,
		placeHolder: "",
		value: "",
        className:'hidden'
	},
	{
		label: "Role",
		fieldName: "role",
		inputType: InputType.DROPDOWN,
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "Role is Required"
			}
		],
		options: [
			{
				label: Role.USER,
				value: Role.USER
			},
			{
				label: Role.ACCOUNTANT,
				value: Role.ACCOUNTANT
			},
			{
				label: Role.BDE,
				value: Role.BDE
			},
			{
				label: Role.DESIGNER,
				value: Role.DESIGNER
			},

			{
				label: Role.MANAGER,
				value: Role.MANAGER
			}
		]
	},
	{
		label: "First Name",
		fieldName: "firstName",
		inputType: InputType.TEXT,
		placeHolder: "Enter first name",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "This Field is required"
			}
		]
	},

	{
		label: "Last Name",
		fieldName: "lastName",
		inputType: InputType.TEXT,
		placeHolder: "Enter last name",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "This Field is required"
			}
		]
	},
	{
		label: "Email",
		fieldName: "email",
		inputType: InputType.TEXT,
		placeHolder: "Enter email",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "Enter Email"
			},
			{
				type: ValidatorsType.PATTERN,
				pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
				msg: "Not Valid Email"
			}
		]
	},
	{
		label: "Mobile",
		fieldName: "mobile",
		inputType: InputType.TEXT,
		placeHolder: "Enter mobile",
		pattern: /[^0-9]/g,
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "Enter mobile"
			}
		]
	},
	{
		label: "Gender",
		fieldName: "gender",
		inputType: InputType.DROPDOWN,
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "Gender is Required"
			}
		],
		options: [
			{
				label: Gender.MALE,
				value: Gender.MALE
			},
			{
				label: Gender.FEMALE,
				value: Gender.FEMALE
			}
		]
	},
	{
		label: "Country",
		fieldName: "country",
		inputType: InputType.TEXT,
		placeHolder: "Enter country",
		value: "In",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "This Field is required"
			}
		]
	},
	{
		label: "State",
		fieldName: "state",
		inputType: InputType.TEXT,
		placeHolder: "Enter state",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "This Field is required"
			}
		]
	},
	{
		label: "City",
		fieldName: "city",
		inputType: InputType.TEXT,
		placeHolder: "Enter City",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "This Field is required"
			}
		]
	},
	{
		label: "Street",
		fieldName: "street",
		inputType: InputType.TEXT,
		placeHolder: "Enter Street",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "This Field is required"
			}
		]
	},
	{
		label: "Pincode",
		fieldName: "pincode",
		inputType: InputType.NUMBER,
		placeHolder: "Enter Pincode",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "This Field is required"
			}
		]
	},
	{
		label: "Image",
		fieldName: "profileImg",
		inputType: InputType.IMAGE,
		className: "col-span-6",
		validators: [
			{
				type: ValidatorsType.REQUIRED,
				msg: "image is Required"
			}
		]
	}
]
