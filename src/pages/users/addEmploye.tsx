import { FormField } from "../../component/interface/all-interface"
import { addEmployeeFunc } from "../../redux/action/userAction"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import Form from "../../reusable/form"
import { addEmployee } from "./form"

const AddEmploye = () => {
	const dispatch = useAppDispatch()
	const { loading } = useAppSelector((state) => state.users)
	const submitFormEvent = (form: FormField) => {
		dispatch(addEmployeeFunc(form))
	}
	return (
		<div className="grid grid-cols-12  p-10 max-sm:p-5 gap-4 mb-10">
			<div className={`col-span-12 p-10 max-sm:p-5 bg-white rounded-md`}>
				<Form
					formData={addEmployee}
					title="Add Employee"
					submitFormEvent={submitFormEvent}
					isResetButton={true}
					loading={loading}
				/>
			</div>
		</div>
	)
}

export default AddEmploye
