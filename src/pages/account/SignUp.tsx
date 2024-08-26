import { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../component/interceptor/interceptor"

const SignUp = () => {
	const navigate = useNavigate()
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [mobile, setMobile] = useState<string>("")

	const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { data } = await axiosInstance.post("/register", { firstName, lastName, email, mobile })
		if (data) navigate("/login")
	}

	useEffect(() => {
		const accessToken = JSON.parse(localStorage.getItem("token") as string)
		if (accessToken) navigate("/")
		else navigate("/signup")
	}, [])
	return (
		<div className="flex justify-center items-center h-[100vh] bg-gray-200">
			<div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
				<form onSubmit={handleSignUp} className="space-y-6" action="#">
					<h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
					<div>
						<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your first name</label>
						<input
							value={firstName || ""}
							onChange={(e) => setFirstName(e.target.value)}
							type="text"
							name="firstName"
							id="firstName"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							placeholder="Enter firstName"
							required
						/>
					</div>
					<div>
						<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your last name</label>
						<input
							value={lastName || ""}
							onChange={(e) => setLastName(e.target.value)}
							type="text"
							name="lastName"
							id="lastName"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							placeholder="Enter lastName"
							required
						/>
					</div>
					<div>
						<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
						<input
							value={email || ""}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							name="email"
							id="email"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							placeholder="Enter email"
							required
						/>
					</div>
					<div>
						<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your mobile</label>
						<input
							value={mobile || ""}
							onChange={(e) => setMobile(e.target.value)}
							type="number"
							name="number"
							id="number"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							placeholder="Enter number"
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						SignUp
					</button>
					<button
						onClick={() => navigate("/login")}
						type="button"
						className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	)
}

export default SignUp
