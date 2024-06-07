import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ColumnType } from "../../component/enums/enum"
import { allUsersFunc } from "../../redux/action/userAction"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import Table from "../../reusable/table"

const AllUsers = () => {
	const { users, loading, userLoaded } = useAppSelector((state) => state.users)
	const [search, setSearch] = useState<any>("")
	const [limit, setLimit] = useState<number>(5)
	const [page, setPage] = useState<number>(1)

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const setPropValForLink = (val: any) => {
		navigate(`/single-user/${val?.data?._id}`)
	}

	const deleteProductVal = (val: string) => {
		console.log(val)
		// dispatch(commonDeleteFunc("deleteProduct", val))
	}

	const obj = {
		_id: "665ed76197d203525658ddbe",
		profileImg: "",
		firstName: "rk",
		lastName: "yadav",
		email: "yadavritik467@gmail.com",
		mobile: 6260380884,
		prescriptionImg: "",
		gender: "",
		country: "India",
		state: "",
		city: "",
		pincode: null,
		street: "",
		role: "admin",
		createdAt: "2024-06-04T08:59:13.771Z",
		updatedAt: "2024-06-04T08:59:13.771Z"
	}
	const customColumnsClass = {
		_id: { className: "w-[300px] text-center", isView: true },
		profileImg: { className: "w-[250px] flex justify-center", columnType: ColumnType.IMAGE },
		createdAt: { columnType: ColumnType.DATE },
		updatedAt: { columnType: ColumnType.DATE }
	}

	const getUsers = (val: any) => {
		dispatch(allUsersFunc(val?.searchInput, val?.currentPage, val?.limit))
	}

	useEffect(() => {
		if (!userLoaded) dispatch(allUsersFunc("", 1, 5))
	}, [userLoaded])
	return (
		<div className="grid grid-cols-12 gap-4 p-4">
			<div className="col-span-12">
				<Table
					title="All products"
					obj={obj}
					tableData={users}
					customColumns={customColumnsClass}
					setPropValForLink={setPropValForLink}
					deleteVal={deleteProductVal}
					loading={loading}
					callApi={getUsers}
					searchInput={search}
					page={page}
					setPage={setPage}
					limit={limit}
					setLimit={setLimit}
					setSearchInputVal={setSearch}
				/>
			</div>
		</div>
	)
}

export default AllUsers
