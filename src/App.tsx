import React, { Suspense } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import MainLayout from "./layouts/mainLayout"
import ClientMainLayout from "./client/layouts/ClientMainLayout"
import ScrollToTop from "./utils/ScrollToTop"
import Loader from "./component/Loader/Loader"

// Lazy-loaded routes
const Login = React.lazy(() => import("./pages/account/Login"))
const SignUp = React.lazy(() => import("./pages/account/SignUp"))
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

// for clinet side
const MainHome = React.lazy(() => import("./client/pages/MainHome/MainHome"))
const SearchProduct = React.lazy(() => import("./client/pages/search-product/SearchProduct"))
const SingleProductClient = React.lazy(() => import("./client/pages/single-product/SingleProduct"))
const CategoryProd = React.lazy(() => import("./client/pages/category-prod/CategoryProd"))
const MyProfile = React.lazy(() => import("./client/pages/my-profile/MyProfile"))
const Cart = React.lazy(() => import("./client/pages/cart/Cart"))

const App = () => {
	return (
		<div>
			<ToastContainer />
			<Router basename="/">
				<ScrollToTop />
				<Routes>
					<Route
						path="login"
						element={
							<Suspense
								fallback={
									<div className="w-full flex justify-center items-center h-[500px]">
										<Loader />
									</div>
								}
							>
								<Login />
							</Suspense>
						}
					/>
					<Route
						path="signup"
						element={
							<Suspense
								fallback={
									<div className="w-full flex justify-center items-center h-[500px]">
										<Loader />
									</div>
								}
							>
								<SignUp />
							</Suspense>
						}
					/>
					<Route path="" element={<ClientMainLayout />}>
						<Route
							path=""
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
									<MainHome />
								</Suspense>
							}
						/>
						<Route
							path="search-product"
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
									<SearchProduct />
								</Suspense>
							}
						/>
						<Route
							path="categoryProd"
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
									<CategoryProd />
								</Suspense>
							}
						/>
						<Route
							path="singleProd/:id"
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
									<SingleProductClient />
								</Suspense>
							}
						/>
						<Route
							path="myProfile"
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
									<MyProfile />
								</Suspense>
							}
						/>
						<Route
							path="cart"
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
									<Cart />
								</Suspense>
							}
						/>
					</Route>
					<Route path="/dashboard" element={<MainLayout />}>
						<Route
							path=""
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
									<Dashboard />
								</Suspense>
							}
						/>
						<Route
							path="add-products"
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
									<AddProducts />
								</Suspense>
							}
						/>
						<Route
							path="all-products"
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
									<AllProducts />
								</Suspense>
							}
						/>
						<Route
							path="expired-products"
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
									<ExpiredProducts />
								</Suspense>
							}
						/>
						<Route
							path="single-product/:prodId"
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
									<SingleProduct />
								</Suspense>
							}
						/>
						<Route
							path="create-structure"
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
									<CreateStructure />
								</Suspense>
							}
						/>
						<Route
							path="all-structure"
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
									<AllStructure />
								</Suspense>
							}
						/>
						<Route
							path="add-employee"
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
									<AddEmploye />
								</Suspense>
							}
						/>
						<Route
							path="all-users"
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
									<AllUsers />
								</Suspense>
							}
						/>
						<Route
							path="all-employee"
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
									<Employee />
								</Suspense>
							}
						/>
						<Route
							path="single-user/:id"
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
									<EditUsers />
								</Suspense>
							}
						/>
						<Route
							path="all-orders"
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
									<AllOrders />
								</Suspense>
							}
						/>
						<Route
							path="single-order/:id"
							element={
								<Suspense
									fallback={
										<div className="w-full flex justify-center items-center h-[500px]">
											<Loader />
										</div>
									}
								>
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
