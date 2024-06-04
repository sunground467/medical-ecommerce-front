import { CiSearch } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { IoMdPower } from "react-icons/io";
import { IoNotifications, IoSettings } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate()

	const logoutHandler = () => {
		localStorage.removeItem("token")
		navigate("/login")
	}

	return (
		<div className={`w-full bg-white border border-l-0 flex justify-between items-center px-8 py-4 h-fit `}>
			<div className={`w-[350px] flex items-center px-4 bg-gray-200  overflow-hidden rounded-full`}>
				<CiSearch fontSize={24} color="gray" />
				<input
					type="text"
					placeholder="search here . ."
					className={`content bg-gray-200  rounded-full p-2 outline-none border-none`}
				/>
			</div>
			<div className="flex justify-center items-center gap-4">
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
