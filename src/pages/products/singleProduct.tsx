import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FormField } from "../../component/interface/all-interface"
import { addStockInProd, getSingleProductList, updateSingleProductList } from "../../redux/action/productAction"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import Form from "../../reusable/form"
import { nestedProductForm, productForm } from "./form"

const SingleProduct = () => {
	const [prodForm, setProdForm] = useState<FormField[]>(productForm)
	const [childProdForm, setChildProdForm] = useState<FormField[]>(nestedProductForm)
	const { prodId } = useParams()
	const dispatch = useAppDispatch()
	const { allSubCategory } = useAppSelector((state) => state.category)
	const { singleProduct } = useAppSelector((state) => state.product)

	const submiteFormEvent = (form: any) => {
		if (prodId) {
			let formObj: any = {}
			for (const key in form) {
				if (singleProduct[key] !== form[key]) formObj[key] = form[key]
			}
			dispatch(updateSingleProductList(prodId, formObj))
		}
	}

	const submiteProdStockEvent = (form: any) => {
		dispatch(addStockInProd(form))
	}

	useEffect(() => {
		if (prodId) {
			dispatch(getSingleProductList(prodId))
		}
	}, [prodId])

	useEffect(() => {
		const updatedNewForm = prodForm.map((field: FormField) => {
			if (field.options && !field.options?.length) {
				return {
					...field,
					value: singleProduct[field.fieldName],
					options: allSubCategory.map((cat: any) => ({
						label: cat?.subcategoryName,
						value: cat?.subcategoryName
					}))
				}
			} else {
				return {
					...field
				}
			}
		})
		setProdForm(updatedNewForm)
	}, [allSubCategory.length])

	useEffect(() => {
		const updateChilddNewForm = childProdForm.map((field: any) => {
			if (field.fieldName === "productId") {
				return {
					...field,
					value: singleProduct?._id
				}
			} else if (field.fieldName === "prodName") {
				return {
					...field,
					value: singleProduct?.prodName
				}
			} else {
				return {
					...field
				}
			}
		})
		setChildProdForm(updateChilddNewForm)
	}, [singleProduct])

	return (
		<div className="grid grid-cols-12  p-10 gap-4 mb-10">
			<div className={`col-span-12 p-10 bg-white rounded-md`}>
				<Form
					formData={prodForm}
					title="Update Product details"
					submiteFormEvent={submiteFormEvent}
					isResetButton={true}
					formValuObj={singleProduct}
				/>
			</div>
			<div className={`col-span-12 p-10 bg-white rounded-md`}>
				<Form
					formData={childProdForm}
					title="Update Nested child Product"
					submiteFormEvent={submiteProdStockEvent}
					isResetButton={true}
					takeFieldValue={true}
				/>
			</div>
		</div>
	)
}

export default SingleProduct
