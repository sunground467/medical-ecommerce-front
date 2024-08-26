import { useEffect, useState } from "react"
import { FormField } from "../../component/interface/all-interface"
import { addStockInProd, createProduct } from "../../redux/action/productAction"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import Form from "../../reusable/form"
import { nestedProductForm, productForm } from "./form"

const AddProducts = () => {
	const [prodForm, setProdForm] = useState<FormField[]>(productForm)
	const [childProdForm, setChildProdForm] = useState<FormField[]>(nestedProductForm)
	const [inputFormVal, setInputFormVal] = useState<any>({})

	const { productId, productName, loading, secoundloading } = useAppSelector((state) => state.product)
	const { allSubCategory } = useAppSelector((state) => state.category)

	const dispatch = useAppDispatch()

	const submitFormEvent = (form: FormField) => {
		dispatch(createProduct(form))
	}
	const submiteProdStockEvent = (form: FormField) => {
		dispatch(addStockInProd(form))
	}

	useEffect(() => {
		const updatedNewForm = prodForm.map((field: FormField) => {
			if (!field.options?.length) {
				return {
					...field,
					options: allSubCategory.map((cat: any) => ({
						label: cat?.subcategoryName,
						value: cat?.subcategoryName
					}))
				}
			} else if (field.fieldName === "sellingPrice") {
				return {
					...field,
					value: Number(inputFormVal["mrpRate"]) * Number((100 - inputFormVal["discountPerCentage"]) / 100)
				}
			} else {
				return {
					...field
				}
			}
		})
		setProdForm(updatedNewForm)
	}, [inputFormVal, allSubCategory.length])

	useEffect(() => {
		const updateChilddNewForm = childProdForm.map((field: any) => {
			if (field.fieldName === "productId") {
				return {
					...field,
					value: productId
				}
			} else if (field.fieldName === "prodName") {
				return {
					...field,
					value: productName
				}
			} else {
				return {
					...field
				}
			}
		})

		setChildProdForm(updateChilddNewForm)
	}, [productId, productName])
	return (
		<div className="grid grid-cols-12  p-10 max-sm:p-5 gap-4 mb-10">
			<div className={`col-span-12 p-10 max-sm:p-5 bg-white rounded-md`}>
				<Form
					formData={prodForm}
					title="Create Product"
					inputFormVal={setInputFormVal}
					submitFormEvent={submitFormEvent}
					isResetButton={true}
					loading={loading}
				/>
			</div>
			<div className={`col-span-12 p-10 max-sm:p-5 bg-white rounded-md`}>
				<Form
					formData={childProdForm}
					title="Nested child Product"
					inputFormVal={setInputFormVal}
					submitFormEvent={submiteProdStockEvent}
					isResetButton={true}
					loading={secoundloading}
				/>
			</div>
		</div>
	)
}

export default AddProducts
