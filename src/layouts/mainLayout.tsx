import { Outlet, useNavigate } from "react-router-dom"
import Header from "./header"
import SideNav from "./sideNav"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { getAllCategories, getAllSubCategories } from "../redux/action/categoryAction"

const MainLayout = () => {
	const { categoryLoaded, subCategoryLoaded } = useAppSelector((state) => state.category)
	const [toggle, setToggle] = useState<boolean>(false)

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const returnDispatchFunc = (func: any) => {
		const accessToken = JSON.parse(localStorage.getItem("token") as string)
		if (!accessToken) {
			navigate("/login")
		} else {
			dispatch(func)
		}
	}
	useEffect(() => {
		if (!categoryLoaded) returnDispatchFunc(getAllCategories("", 100, 1))
	}, [categoryLoaded])
	useEffect(() => {
		if (!subCategoryLoaded) returnDispatchFunc(getAllSubCategories("", 100, 1))
	}, [subCategoryLoaded])

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 800) {
				return setToggle(true)
			}
			return setToggle(false)
		}
		handleResize()
		window.addEventListener("resize", handleResize)
		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	return (
		<div  className="w-[100vw] flex">
			<div className={`${toggle ? "hidden" : "w-[250px]"} `}>
				<SideNav />
			</div>
			<div className={`${toggle ? "w-[100vw]" : "setWidth"}`}>
				<Header setToggle={setToggle} />
				<div className={`h-[96.3vh] overflow-y-scroll bg-gray-200`}>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default MainLayout
