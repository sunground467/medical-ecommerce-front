import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import MainLayout from "./layouts/mainLayout"
import Login from "./pages/account/Login"
import AddProducts from "./pages/products/addProducts"
import AllProducts from "./pages/products/allProducts"
import SingleProduct from "./pages/products/singleProduct"
import AllStructure from "./pages/structure/allStructure"
import CreateStructure from "./pages/structure/createStructure"
import { useState } from "react"
import ExpiredProducts from "./pages/products/expiredProducts"
import Employee from "./pages/users/employee"
import AddEmploye from "./pages/users/addEmploye"
import AllUsers from "./pages/users/allUsers"
import EditUsers from "./pages/users/editUsers"
import Dashboard from "./pages/Dashboard"
const App = () => {
	const [search, setSearch] = useState<string>("")
	const [limit, setLimit] = useState<number>(5)
	const [page, setPage] = useState<number>(1)

	const [subSearch, setSubSearch] = useState<any>("")
	const [subLimit, setSubLimit] = useState<number>(5)
	const [subPage, setSubPage] = useState<number>(1)
	return (
		<div>
			<ToastContainer />
			<Router basename="/">
				<Routes>
					<Route path="login" element={<Login />} />
					<Route
						path="/"
						element={
							<MainLayout
								search={search}
								limit={limit}
								page={page}
								subSearch={subSearch}
								subLimit={subLimit}
								subPage={subPage}
							/>
						}
					>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="add-products" element={<AddProducts />} />
						<Route path="all-products" element={<AllProducts />} />
						<Route path="expired-products" element={<ExpiredProducts />} />
						<Route path="single-product/:prodId" element={<SingleProduct />} />
						<Route path="create-structure" element={<CreateStructure search={search} limit={limit} page={page} />} />
						<Route
							path="all-structure"
							element={
								<AllStructure
									setSearch={setSearch}
									limit={limit}
									setLimit={setLimit}
									page={page}
									setPage={setPage}
									setSubSearch={setSubSearch}
									subLimit={subLimit}
									setSubLimit={setSubLimit}
									subPage={subPage}
									setSubPage={setSubPage}
								/>
							}
						/>
						<Route path="add-employee" element={<AddEmploye />} />
						<Route path="all-users" element={<AllUsers />} />
						<Route path="all-employee" element={<Employee />} />
						<Route path="single-user/:id" element={<EditUsers />} />
					</Route>
				</Routes>
			</Router>
		</div>
	)
}

export default App
