import { useEffect, useState } from "react"
import { IoIosRefresh } from "react-icons/io"
import { FormField } from "../../component/interface/all-interface"
import { createCatorgyMainTitle, createSubCategory, getAllCategories } from "../../redux/action/categoryAction"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import Form from "../../reusable/form"
import { createCategoryTitle, createSubCategoryForm } from "./form"

const CreateStructure = () => {
	const { allCategoryMainTitle } = useAppSelector((state) => state.category)
	const [subcategoryForm, setSubCategoryForm] = useState<FormField[]>(createSubCategoryForm)
	const dispatch = useAppDispatch()

	const submiteSubCategoryFormEvent = async (form: any) => {
		dispatch(createSubCategory(form))
	}

	const submiteCategoryFormEvent = async (form: any) => {
		const categoryTitle = form.categoryTitle
			.split(" ")
			.map((input: any) => {
				if (input) return input.toLowerCase()
			})
			.filter((input: any) => {
				return input !== undefined
			})
			.join(" ")

		dispatch(createCatorgyMainTitle(categoryTitle))
	}

	useEffect(() => {
		const newsubcategoryForm = subcategoryForm.map((field) => {
			if (!field.options?.length) {
				return {
					...field,
					options: allCategoryMainTitle.map((title: any) => ({
						label: title?.categoryTitle,
						value: title?.categoryTitle
					}))
				}
			} else {
				return {
					...field
				}
			}
		})
		setSubCategoryForm(newsubcategoryForm)
	}, [allCategoryMainTitle.length])
	return (
		<div className="grid grid-cols-12  p-10 max-sm:p-5 gap-4 mb-10">
			<div className={`col-span-12 p-10 max-sm:p-5 bg-white rounded-md`}>
				<Form
					formData={createCategoryTitle}
					title="Create Category title"
					btnName={"Create"}
					submiteFormEvent={submiteCategoryFormEvent}
				/>
			</div>
			<div className={`col-span-12 p-10 max-sm:p-5 relative bg-white rounded-md`}>
				<button onClick={() => dispatch(getAllCategories('', 100, 1))} className="absolute right-5 top-4">
					<IoIosRefresh fontSize={25} color="blue" />
				</button>
				<Form
					formData={subcategoryForm}
					title="Create Subcategory Form"
					btnName={"Create"}
					submiteFormEvent={submiteSubCategoryFormEvent}
				/>
			</div>
		</div>
	)
}

export default CreateStructure
