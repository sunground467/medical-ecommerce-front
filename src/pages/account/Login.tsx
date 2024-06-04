import { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../component/interceptor/interceptor"

const Login = () => {
	const [mobile, setMobile] = useState<any>()
	const navigate = useNavigate()
	const adminLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (mobile) {
			const { data } = await axiosInstance.post(`/adminLogin`, { mobile })
			localStorage.setItem("token", JSON.stringify(data?.token))
			navigate("/")
		}
	}

	useEffect(() => {
		const accessToken = JSON.parse(localStorage.getItem("token") as string)
		if (accessToken) navigate("/")
	}, [])
	return (
		<div className="flex justify-center items-center h-[100vh] bg-gray-200">
			<div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
				<form onSubmit={adminLogin} className="space-y-6" action="#">
					<h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
					<div>
						<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your mobile</label>
						<input
							value={mobile || ""}
							onChange={(e) => setMobile(e.target.value)}
							type="number"
							name="number"
							id="number"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							placeholder="name@company.com"
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login
