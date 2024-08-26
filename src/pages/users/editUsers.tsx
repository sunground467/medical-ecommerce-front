import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FormField } from "../../component/interface/all-interface"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import Form from "../../reusable/form"
import { addEmployee } from "./form"
import { addEmployeeFunc, getSingleUserFunc } from "../../redux/action/userAction"

const EditUsers = () => {
	const [userForm, setUserForm] = useState<FormField[]>(addEmployee)
	const { id } = useParams()
	const dispatch = useAppDispatch()

	const { singleUser }:any = useAppSelector((state) => state.users)

	const submitFormEvent = (form: any) => {
		if (id) {
			let formObj: any = {}
			for (const key in form) {
				if (singleUser[key] !== form[key]) formObj[key] = form[key]
			}
			dispatch(addEmployeeFunc(formObj, id))
		}
	}

	useEffect(() => {
		if (id) {
			dispatch(getSingleUserFunc(id))
		}
	}, [id])

	useEffect(() => {
		const updatedNewForm = userForm.map((field: FormField) => {
			if (field.fieldName === "_id") {
				return {
					...field,
					className: "block col-span-12 max:sm-col-span-12"
				}
			} else {
				return {
					...field
				}
			}
		})
		setUserForm(updatedNewForm)
	}, [])

	return (
		<div className="grid grid-cols-12  p-10 max-sm:p-5 gap-4 mb-10">
			<div className={`col-span-12 p-10 max-sm:p-5 bg-white rounded-md`}>
				<Form
					formData={userForm}
					title="Update User details"
					submitFormEvent={submitFormEvent}
					isResetButton={true}
					formValueObj={singleUser}
				/>
			</div>
		</div>
	)
}

export default EditUsers
