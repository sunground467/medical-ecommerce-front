import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { getAllCategories, getAllSubCategories } from "../../redux/action/categoryAction"
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"
import { Color } from "../../component/styles/color"
import { useNavigate } from "react-router-dom"
import { logout, myProfile } from "../../redux/action/userAction"
import { CiLogout } from "react-icons/ci"
import { MdDashboard } from "react-icons/md"

const Header = () => {
	const { categoryLoaded, subCategoryLoaded } = useAppSelector((state) => state.category)
	const { user } = useAppSelector((state) => state.users)
	const { cart } = useAppSelector((state) => state.cart)

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (!categoryLoaded) dispatch(getAllCategories("", 100, 1))
	}, [categoryLoaded])
	useEffect(() => {
		if (!subCategoryLoaded) dispatch(getAllSubCategories("", 100, 1))
	}, [subCategoryLoaded])
	useEffect(() => {
		const token = JSON.parse(localStorage.getItem("token") as string)
		if (token) {
			dispatch(myProfile())
		}
	}, [])

	const logoutHandler = () => {
		dispatch(logout())
	}
	return (
		<div className="w-full sticky top-0 z-[50] grid grid-cols-12 py-4 justify-evenly items-center bg-white border border-l-0 border-t-0 border-r-0 border-b-2 shadow">
			<div onClick={() => navigate("/")} className="col-span-3 justify-end flex">
				<p className="text-[25px] cursor-pointer text-primary">BUY</p>
				<p className="text-[25px] cursor-pointer text-black opacity-60 ">MEDICINE</p>
			</div>
			<div className="col-span-6 flex justify-center items-center">
				<div
					onClick={() => navigate("/search-product")}
					className="w-[400px] flex items-center px-4 border border-primary h-[35px] rounded-full "
				>
					<input
						type="text"
						className="bg-transparent outline-none border-none"
						placeholder="search for medicine . . "
					/>
				</div>
			</div>
			<div className="col-span-3 flex items-center gap-4">
				<div className="cursor-pointer">
					{user && user?.role === "user" ? (
						<div className="flex items-center gap-4">
							<FaUserCircle onClick={() => navigate("/myProfile")} fontSize={24} color={Color.primary} />
							<CiLogout onClick={logoutHandler} fontSize={24} color={Color.primary} />
						</div>
					) : user && user?.role === "admin" ? (
						<div className="flex items-center gap-4">
							<MdDashboard onClick={() => navigate("/dashboard")} fontSize={24} color={Color.primary} />
							<FaUserCircle onClick={() => navigate("/myProfile")} fontSize={24} color={Color.primary} />
							<CiLogout onClick={logoutHandler} fontSize={24} color={Color.primary} />
						</div>
					) : (
						<p onClick={() => navigate("/login")} className="text-[20px] text-primary">
							Login
						</p>
					)}
				</div>
				<div onClick={() => navigate("/cart")} className="relative cursor-pointer">
					<FaShoppingCart fontSize={24} color={Color.primary} />
					<span className="absolute top-[-15px] w-6 h-6 rounded-full bg-red-500 text-white text-center right-[-25px]">
						{cart?.length}
					</span>
				</div>
			</div>
		</div>
	)
}

export default Header
