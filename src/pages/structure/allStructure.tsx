import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ColumnType } from "../../component/enums/enum"
import { FormField } from "../../component/interface/all-interface"
import { getAllCategories, getAllSubCategories, updateCatorgyMainTitle } from "../../redux/action/categoryAction"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import Table from "../../reusable/table"
import { updateCategoryTitle, updateSubCategoryForm } from "./form"

const AllStructure = () => {
	const { allCategoryMainTitle, allSubCategory, loading } = useAppSelector((state) => state.category)
	const [subcategoryForm, setSubCategoryForm] = useState<FormField[]>(updateSubCategoryForm)
	const [search, setSearch] = useState<string>("")
	const [limit, setLimit] = useState<number>(5)
	const [page, setPage] = useState<number>(1)

	const [subSearch, setSubSearch] = useState<any>("")
	const [subLimit, setSubLimit] = useState<number>(5)
	const [subPage, setSubPage] = useState<number>(1)

	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const obj = {
		_id: "66570d45df5d6c235f08125c",
		categoryTitle: "electronics category"
	}
	const obj2 = {
		_id: "",
		subCategoryImg: "",
		forCategoryMainTitle: "",
		subcategoryName: "",
		createdAt: "2024-05-30T05:56:25.252Z",
		updatedAt: "2024-05-30T05:56:25.252Z"
	}
	const customColumnsClass = {
		_id: { className: " text-center p-2" },
		categoryTitle: { className: "text-center p-2 uppercase" },
		createdAt: { columnType: ColumnType.DATE },
		updatedAt: { columnType: ColumnType.DATE }
	}
	const customColumnsClass2 = {
		_id: { className: "w-[300px] text-center p-2" },
		forCategoryMainTitle: { className: "w-[300px] text-center p-2 uppercase" },
		subcategoryName: { className: "w-[300px] text-center p-2" },
		subCategoryImg: {
			className: "text-center p-2 w-[200px] flex justify-center items-center h-[45px] object-cover",
			columnType: ColumnType.IMAGE
		},
		createdAt: { columnType: ColumnType.DATE },
		updatedAt: { columnType: ColumnType.DATE }
	}

	const setPropValForLink = (val: any) => {
		navigate(`/update-structure/${val}`)
	}

	const deleteCategoryVal = (val: string) => {
		console.log(val)
		// dispatch(commonDeleteFunc("categoryTitle", val))
	}
	const deleteSubCategoryVal = (val: string) => {
		console.log(val)
		// dispatch(commonDeleteFunc("updateSubcategory", val))
	}

	const submitCategoryForm = (val: any) => {
		console.log(val)
		dispatch(updateCatorgyMainTitle(val?.valueData?._id, val?.valueData?.categoryTitle, val?.form?.categoryTitle))
	}
	const submitSubCategoryForm = (val: any) => {
		console.log(val)
	}

	const getCategory = (val: any) => {
		dispatch(getAllCategories(val?.searchInput, val?.limit, val?.currentPage))
	}
	const getSubCategory = (val: any) => {
		dispatch(getAllSubCategories(val?.searchInput, val?.limit, val?.currentPage))
	}

	useEffect(() => {
		const newsubcategoryForm = updateSubCategoryForm.map((field) => {
			if (!field.options?.length) {
				return {
					...field,
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
		setSubCategoryForm(newsubcategoryForm)
	}, [allSubCategory.length])

	return (
		<div className="grid grid-cols-12 gap-4 pb-20 p-4">
			<div className="col-span-12">
				<Table
					title="All category Headings"
					obj={obj}
					tableData={allCategoryMainTitle}
					customColumns={customColumnsClass}
					setPropValForLink={setPropValForLink}
					deleteVal={deleteCategoryVal}
					isEditBtn={true}
					formData={updateCategoryTitle}
					formTitle="Update Category title"
					submiteFormEvent={submitCategoryForm}
					loading={loading}
					page={page}
					setPage={setPage}
					limit={limit}
					setLimit={setLimit}
					callApi={getCategory}
					searchInput={search}
					setSearchInputVal={setSearch}
				/>
			</div>
			<div className="col-span-12">
				<Table
					title="All sub category"
					obj={obj2}
					tableData={allSubCategory}
					customColumns={customColumnsClass2}
					setPropValForLink={setPropValForLink}
					deleteVal={deleteSubCategoryVal}
					isEditBtn={true}
					formData={subcategoryForm}
					formTitle="Update Sub Category"
					submiteFormEvent={submitSubCategoryForm}
					loading={loading}
					page={subPage}
					setPage={setSubPage}
					limit={subLimit}
					setLimit={setSubLimit}
					callApi={getSubCategory}
					searchInput={subSearch}
					setSearchInputVal={setSubSearch}
				/>
			</div>
		</div>
	)
}

export default AllStructure
