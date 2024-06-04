import { Outlet, useNavigate } from "react-router-dom"
import Header from "./header"
import SideNav from "./sideNav"
import { useEffect } from "react"
import { useAppDispatch } from "../redux/store"
import { getAllCategories, getAllSubCategories } from "../redux/action/categoryAction"

const MainLayout = ({ search, limit, page, subSearch, subLimit, subPage }: any) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const returnDispatchFunc = (func: any) => {
		const accessToken = JSON.parse(localStorage.getItem("token") as string)
		if (!accessToken) {
			navigate("/login")
		} else {
			const handler = setTimeout(() => {
				dispatch(func)
			}, 1500)

			return () => {
				clearTimeout(handler)
			}
		}
	}
	useEffect(() => {
		const cleanup = returnDispatchFunc(getAllCategories(search, limit, page))
		return cleanup
	}, [search, limit, page, dispatch, navigate])
	useEffect(() => {
		const cleanup = returnDispatchFunc(getAllSubCategories(subSearch, subLimit, subPage))
		return cleanup
	}, [navigate, dispatch, subSearch, subLimit, subPage])

	return (
		<div className="grid grid-cols-12  ">
			<div className="col-span-2  max-xl:col-span-3">
				<SideNav />
			</div>
			<div className="col-span-10 max-xl:col-span-9">
				<Header />
				<div className={`h-[96.3vh] overflow-y-scroll bg-gray-200`}>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default MainLayout
