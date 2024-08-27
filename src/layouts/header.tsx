import { useEffect } from "react"
import { CiMenuFries } from "react-icons/ci"
import { FaUserCircle } from "react-icons/fa"
import { IoMdPower } from "react-icons/io"
import { IoHome, IoNotifications, IoSettings } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { logout } from "../redux/action/userAction"
import { useAppDispatch } from "../redux/store"

const Header = ({ setToggle }: any) => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	// const { accessToken } = useAppSelector((state) => state.users)

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem("token") as string)
		if (!token) {
			navigate("/login")
		}
	}, [])

	const logoutHandler = async () => {
		await dispatch(logout())
		navigate('/login')
	}

	return (
		<div className={`w-full bg-white border border-l-0 flex justify-between items-center px-8 py-4 h-fit `}>
			<div
				onClick={() => setToggle((prev: boolean) => !prev)}
				className="cursor-pointer active:bg-gray-200 active:rounded-full p-2"
			>
				<CiMenuFries fontSize={24} color="gray" />
			</div>
			<div className="flex justify-center items-center gap-4">
				<button>
					<IoHome onClick={() => navigate("/")} fontSize={24} color="gray" />
				</button>
				<button>
					<IoSettings fontSize={24} color="gray" />
				</button>
				<button>
					<IoNotifications fontSize={24} color="gray" />
				</button>
				<button className="relative">
					<FaUserCircle fontSize={24} color="gray" />
				</button>
				<button onClick={() => logoutHandler()}>
					<IoMdPower fontSize={24} color="gray" />
				</button>
			</div>
		</div>
	)
}

export default Header
