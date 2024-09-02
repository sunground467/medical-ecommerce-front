import { Fragment, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { getAllCategories, getAllSubCategories } from "../../redux/action/categoryAction"
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"
import { Color } from "../../component/styles/color"
import { useNavigate } from "react-router-dom"
import { logout, myProfile } from "../../redux/action/userAction"
import { CiLogout, CiMenuBurger, CiSearch } from "react-icons/ci"
import { MdDashboard } from "react-icons/md"
import { getAllProducts } from "../../redux/action/productAction"
import { RxCross1 } from "react-icons/rx"

const Header = () => {
	const { categoryLoaded, subCategoryLoaded } = useAppSelector((state) => state.category)
	const { user, accessToken } = useAppSelector((state) => state.users)
	const { cart } = useAppSelector((state) => state.cart)
	const [input, setInput] = useState("")
	const [toggle, setToggle] = useState(true)

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (!categoryLoaded) dispatch(getAllCategories("", 100, 1))
	}, [categoryLoaded])
	useEffect(() => {
		if (!subCategoryLoaded) dispatch(getAllSubCategories("", 100, 1))
	}, [subCategoryLoaded])
	useEffect(() => {
		if (accessToken) {
			dispatch(myProfile())
		} else {
			navigate("/")
		}
	}, [accessToken])

	useEffect(() => {
		const categoryName = "medical"
		let interval = setTimeout(() => {
			dispatch(getAllProducts(input, 1, 10, categoryName))
		}, 1500)

		return () => clearTimeout(interval)
	}, [input])

	const logoutHandler = async () => {
		await dispatch(logout())
	}
	return (
		<Fragment>
			<div className="w-full h-fit flex sticky top-0 z-[50] py-4 justify-evenly max-sm:justify-between max-sm:px-5  items-center bg-white border border-l-0 border-t-0 border-r-0 border-b-2 shadow">
				<div
					onClick={() => {
						setToggle(true)
						navigate("/")
					}}
					className="flex"
				>
					<p className="text-[25px] max-sm:text-[20px] cursor-pointer text-primary">BUY</p>
					<p className="text-[25px] max-sm:text-[20px] cursor-pointer text-black opacity-60 ">MEDICINE</p>
				</div>
				<div className="flex max-sm:hidden">
					<div
						onClick={() => navigate("/search-product")}
						className="w-[400px] max-[900px]:w-[300px] flex items-center px-4 border border-primary h-[35px] rounded-full "
					>
						<input
							type="text"
							className="bg-transparent outline-none border-none"
							placeholder="search for medicine . . "
							onChange={(e) => setInput(e.target?.value)}
						/>
					</div>
				</div>
				<div className="hidden max-sm:flex j items-center gap-4 ">
					<CiSearch
						fontSize={24}
						color={Color.primary}
						onClick={() => {
							setToggle(true)
							navigate("/search-product")
						}}
					/>
					<div
						onClick={() => {
							setToggle(true)
							navigate("/cart")
						}}
						className="relative cursor-pointer"
					>
						<FaShoppingCart fontSize={22} color={Color.primary} />
						<span className="absolute top-[-15px] w-5 h-5 text-sm rounded-full bg-red-500 text-white text-center right-[-15px]">
							{cart?.length}
						</span>
					</div>
					{toggle ? (
						<CiMenuBurger fontSize={24} onClick={() => setToggle(false)} color={Color.primary} />
					) : (
						<RxCross1 fontSize={24} onClick={() => setToggle(true)} color={Color.primary} />
					)}
				</div>
				<div className=" max-sm:hidden flex items-center gap-4">
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
			<div
				className={`hidden max-sm:flex flex-col ${toggle ? "h-[0px] duration-300 delay " : "gap-4 p-4 duration-300 delay"}     justify-start  bg-white shadow-sm w-full`}
			>
				{user ? (
					user?.role === "user" ? (
						<div className="border-b-2">
							<p>My profile</p>
						</div>
					) : (
						<>
							<div className="border-b-2">
								<p>Dashboard</p>
							</div>
							<div className="border-b-2">
								<p>My profile</p>
							</div>
						</>
					)
				) : (
					<div
						onClick={() => {
							setToggle(true)
							navigate("/login")
						}}
						className="border-b-2"
					>
						<p>Login</p>
					</div>
				)}
			</div>
		</Fragment>
	)
}

export default Header
