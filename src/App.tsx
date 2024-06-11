import React, { Suspense } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import MainLayout from "./layouts/mainLayout"

// Lazy-loaded routes
const Login = React.lazy(() => import("./pages/account/Login"))
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"))
const AddProducts = React.lazy(() => import("./pages/products/addProducts"))
const AllProducts = React.lazy(() => import("./pages/products/allProducts"))
const ExpiredProducts = React.lazy(() => import("./pages/products/expiredProducts"))
const SingleProduct = React.lazy(() => import("./pages/products/singleProduct"))
const AllStructure = React.lazy(() => import("./pages/structure/allStructure"))
const CreateStructure = React.lazy(() => import("./pages/structure/createStructure"))
const AddEmploye = React.lazy(() => import("./pages/users/addEmploye"))
const AllUsers = React.lazy(() => import("./pages/users/allUsers"))
const EditUsers = React.lazy(() => import("./pages/users/editUsers"))
const Employee = React.lazy(() => import("./pages/users/employee"))
const AllOrders = React.lazy(() => import("./pages/orders/allOrders"))
const SingleOrder = React.lazy(() => import("./pages/orders/singleOrder"))

const App = () => {
	return (
		<div>
			<ToastContainer />
			<Router basename="/">
				<Routes>
					<Route
						path="login"
						element={
							<Suspense fallback={<div className="h-full bg-gray-200"></div>}>
								<Login />
							</Suspense>
						}
					/>
					<Route path="/" element={<MainLayout />}>
						{/* MainLayout component */}
						<Route
							path=""
							element={
								<Suspense fallback={<div className="h-full bg-gray-200"></div>}>
									<Dashboard />
								</Suspense>
							}
						/>
						<Route
							path="add-products"
							element={
								<Suspense fallback={<div className="h-full bg-gray-200"></div>}>
									<AddProducts />
								</Suspense>
							}
						/>
						<Route
							path="all-products"
							element={
								<Suspense fallback={<div className="h-full bg-gray-200"></div>}>
									<AllProducts />
								</Suspense>
							}
						/>
						<Route
							path="expired-products"
							element={
								<Suspense fallback={<div className="h-full bg-gray-200"></div>}>
									<ExpiredProducts />
								</Suspense>
							}
						/>
						<Route
							path="single-product/:prodId"
							element={
								<Suspense fallback={<div className="h-full bg-gray-200"></div>}>
									<SingleProduct />
								</Suspense>
							}
						/>
						<Route
							path="create-structure"
							element={
								<Suspense fallback={<div className="h-full bg-gray-200"></div>}>
									<CreateStructure />
								</Suspense>
							}
						/>
						<Route
							path="all-structure"
							element={
								<Suspense fallback={<div className="h-full bg-gray-200"></div>}>
									<AllStructure />
								</Suspense>
							}
						/>
						<Route
							path="add-employee"
							element={
								<Suspense fallback={<div className="h-full bg-gray-200"></div>}>
									<AddEmploye />
								</Suspense>
							}
						/>
						<Route
							path="all-users"
							element={
								<Suspense fallback={<div className="h-full bg-gray-200"></div>}>
									<AllUsers />
								</Suspense>
							}
						/>
						<Route
							path="all-employee"
							element={
								<Suspense fallback={<div className="h-full bg-gray-200"></div>}>
									<Employee />
								</Suspense>
							}
						/>
						<Route
							path="single-user/:id"
							element={
								<Suspense fallback={<div className="h-full bg-gray-200"></div>}>
									<EditUsers />
								</Suspense>
							}
						/>
						<Route
							path="all-orders"
							element={
								<Suspense fallback={<div className="h-full bg-gray-200"></div>}>
									<AllOrders />
								</Suspense>
							}
						/>
						<Route
							path="single-order/:id"
							element={
								<Suspense fallback={<div className="h-full bg-gray-200"></div>}>
									<SingleOrder />
								</Suspense>
							}
						/>
					</Route>
				</Routes>
			</Router>
		</div>
	)
}

export default App
