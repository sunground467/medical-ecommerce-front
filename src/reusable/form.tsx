import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { InputType } from "../component/enums/enum"
import { FormField, Validators, ValidatorsType } from "../component/interface/all-interface"
import { DotsLoader } from "./DotsLoader"

const Form = ({
	formData,
	title,
	isResetButton,
	btnName,
	submitFormEvent,
	inputFormVal,
	isDisabledBtn,
	formValueObj,
	takeFieldValue,
	loading
}: {
	formData: FormField[]
	title: string
	isResetButton?: boolean
	btnName?: string
	inputFormVal?: any
	submitFormEvent: Function
	isDisabledBtn?: boolean
	formValueObj?: any
	takeFieldValue?: boolean
	loading?: boolean
}) => {
	const [form, setForm] = useState<{ [key: string]: any }>({})
	const [errors, setErrors] = useState<{ [key: string]: any }>({})
	const [showError, setShowError] = useState<boolean>(false)
	const [showResetBtn] = useState<boolean>(isResetButton || false)
	const [disabledBtn] = useState<boolean>(isDisabledBtn || false)

	useEffect(() => {
		if (inputFormVal && form) {
			inputFormVal(form)
		}
	}, [form])

	useEffect(() => {
		if (formValueObj) {
			formData.map((field) => {
				setForm((prev) => ({ ...prev, [field.fieldName]: formValueObj[field.fieldName] }))
			})
		} else if (takeFieldValue) {
			formData.map((field: any) => {
				setForm((prev) => ({ ...prev, [field.fieldName]: field.value || "" }))
			})
		}
	}, [formData, formValueObj, takeFieldValue])

	const submitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		let updatedForm = { ...form }

		for (const field of formData) {
			if (field && field.value) {
				updatedForm = { ...updatedForm, [field.fieldName]: field.value }
			}
			if (field && field.validators) {
				const errorMsg = await setValidation(field, field.validators, updatedForm)
				setErrors((prev) => ({ ...prev, [field.fieldName]: errorMsg }))
			}
		}
		console.log(updatedForm)

		setForm(updatedForm)
		setShowError(true)
		const isFormValid = formData.every((field) => form[field.fieldName])

		if (isFormValid) {
			submitFormEvent(form)
		}
	}
	const setImage = async (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0]
			const reader = new FileReader()
			reader.onloadend = () => {
				if (reader.result) {
					setForm((prev) => ({ ...prev, [fieldName]: reader.result }))
				}
			}
			reader.readAsDataURL(file)
		}
	}

	const setValidation = (field: FormField, validators: Validators[], form: { [key: string]: any }) => {
		for (const validator of validators) {
			switch (validator.type) {
				case ValidatorsType.REQUIRED:
					if (!form[field.fieldName]) {
						return validator.msg
					}
					break
				case ValidatorsType.PATTERN:
					if (!new RegExp(validator.pattern).test(form[field.fieldName])) {
						return validator.msg
					}
					break
				case ValidatorsType.SAME_FIELD:
					if (form[field.fieldName] !== form[validator.fieldName]) {
						return validator.msg
					}
					break
				default:
					return null
			}
		}
	}

	const resetForm = () => {
		setForm({})
		setShowError(false)
	}

	const returnSameInputElement = (field: FormField, inputType: string) => {
		if (InputType.DROPDOWN === inputType) {
			return (
				<div className="flex flex-col gap-2">
					<label className="text-gray-400 text-sm">{field.label} </label>
					<select
						value={form[field.fieldName] || field.value || ""}
						onChange={(e) => setForm((prev) => ({ ...prev, [field.fieldName]: e.target.value }))}
						className="border-2 border-gray-300 text-gray-400 text-sm outline-none bg-transparent p-2 rounded-md"
					>
						<option className="text-gray-400 text-sm" value="">
							select {field.label}
						</option>
						{field.options?.map((_o, index: number) => {
							return (
								<option className="text-black text-sm" key={index} value={String(_o.value)}>
									{_o.label}
								</option>
							)
						})}
					</select>
					<p className="text-red-500 text-sm"> {showError && !form[field.fieldName] && errors[field.fieldName]} </p>
				</div>
			)
		} else {
			return (
				<div className="flex relative z-0 flex-col gap-2 group">
					<input
						type={field.inputType}
						value={field.inputType !== InputType.IMAGE ? form[field.fieldName] || field.value || "" : undefined}
						onChange={(e) => {
							if (InputType.IMAGE !== inputType && field.pattern) {
								const value = e.target.value
								const lettersOnly = value.replace(field.pattern, "")
								setForm((prev) => ({ ...prev, [field.fieldName]: lettersOnly }))
								setErrors((prev) => ({ ...prev, [field.fieldName]: "" }))
							} else if (InputType.IMAGE === inputType) {
								setImage(e, field.fieldName)
								setErrors((prev) => ({ ...prev, [field.fieldName]: "" }))
							} else {
								setForm((prev) => ({ ...prev, [field.fieldName]: e.target.value }))
								setErrors((prev) => ({ ...prev, [field.fieldName]: "" }))
							}
						}}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
					/>
					<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						{field.label}
					</label>

					<p className="text-red-500 text-sm"> {showError && errors[field.fieldName]} </p>
				</div>
			)
		}
	}
	return (
		<form onSubmit={submitForm}>
			<p className="pb-4 mb-4 text-gray-400 border border-b-2 border-l-0 border-t-0 border-r-0">{title}</p>
			<div className="grid grid-cols-12 gap-4">
				{formData.map((field: FormField, i: number) => {
					return (
						<div key={i} className={`${field?.className ? field?.className : "col-span-6 max-sm:col-span-12"}`}>
							{(() => {
								switch (field.inputType) {
									case InputType.TEXT:
										return returnSameInputElement(field, InputType.TEXT)
									case InputType.EMAIL:
										return returnSameInputElement(field, InputType.EMAIL)
									case InputType.MOBILE:
										return returnSameInputElement(field, InputType.MOBILE)
									case InputType.DATE:
										return returnSameInputElement(field, InputType.DATE)
									case InputType.IMAGE:
										return returnSameInputElement(field, InputType.IMAGE)
									case InputType.DROPDOWN:
										return returnSameInputElement(field, InputType.DROPDOWN)
								}
							})()}
						</div>
					)
				})}
			</div>
			<div className="w-full pt-4 flex justify-end gap-4 items-center">
				{showResetBtn && (
					<button type="button" className="bg-yellow-500 rounded-md px-4 py-1 text-white" onClick={() => resetForm()}>
						Reset
					</button>
				)}
				<button
					disabled={disabledBtn}
					className={`bg-primary  ${disabledBtn ? "bg-opacity-20" : ""}  rounded-md px-4 ${loading ? "py-3" : "py-1"} text-white `}
					type="submit"
				>
					{loading ? <DotsLoader /> : btnName ? btnName : "Submit"}
				</button>
			</div>
		</form>
	)
}

export default Form
