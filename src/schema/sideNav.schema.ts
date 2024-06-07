import { SideNavType } from "../component/interface/all-interface"

export const sideNavSchema: SideNavType[] = [
	{
		label: "",
		isActive: true,
		children: [
			{
				label: "Dashboard",
				route: "/"
			}
		]
	},
	{
		label: "prducts",
		isActive: true,
		children: [
			{
				label: "add products",
				route: "/add-products"
			},
			{
				label: "all products",
				route: "/all-products"
			},
			{
				label: "expired products",
				route: "/expired-products"
			}
		]
	},
	{
		label: "Business Stucture",
		isActive: true,
		children: [
			{
				label: "Create structure",
				route: "/create-structure"
			},
			{
				label: "All Structure",
				route: "/all-structure"
			}
		]
	},
	{
		label: "Users",
		isActive: true,
		children: [
			{
				label: "Add Employee",
				route: "/add-employee"
			},
			{
				label: "All Employee",
				route: "/all-employee"
			},
			{
				label: "All Users",
				route: "/all-users"
			}
		]
	},

	{
		label: "Sales",
		isActive: true,
		children: [
			{
				label: "All Sales",
				route: "/all-sales"
			}
		]
	},
	{
		label: "Orders",
		isActive: true,
		children: [
			{
				label: "All Orders",
				route: "/all-orders"
			}
		]
	},
]
