import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"

const ClientMainLayout = () => {
	return (
		<div id="main_div" className="w-[100vw] h-[100vh]  overflow-y-scroll flex flex-col">
			<Header />
			
			<div className={` bg-gray-100`}>
				<Outlet />
			</div>
			<Footer />
		</div>
	)
}

export default ClientMainLayout
