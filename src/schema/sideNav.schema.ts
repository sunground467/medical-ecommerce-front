import { SideNavType } from "../component/interface/all-interface"

export const sideNavSchema: SideNavType[] = [
	{
		label: "",
		isActive: true,
		children: [
			{
				label: "Dashboard",
				route: "/dashboard"
			}
		]
	},
	{
		label: "prducts",
		isActive: true,
		children: [
			{
				label: "add products",
				route: "/dashboard/add-products"
			},
			{
				label: "all products",
				route: "/dashboard/all-products"
			},
			{
				label: "expired products",
				route: "/dashboard/expired-products"
			}
		]
	},
	{
		label: "Business Stucture",
		isActive: true,
		children: [
			{
				label: "Create structure",
				route: "/dashboard/create-structure"
			},
			{
				label: "All Structure",
				route: "/dashboard/all-structure"
			}
		]
	},
	{
		label: "Users",
		isActive: true,
		children: [
			{
				label: "Add Employee",
				route: "/dashboard/add-employee"
			},
			{
				label: "All Employee",
				route: "/dashboard/all-employee"
			},
			{
				label: "All Users",
				route: "/dashboard/all-users"
			}
		]
	},

	{
		label: "Sales",
		isActive: true,
		children: [
			{
				label: "All Sales",
				route: "/dashboard/all-sales"
			}
		]
	},
	{
		label: "Orders",
		isActive: true,
		children: [
			{
				label: "All Orders",
				route: "/dashboard/all-orders"
			}
		]
	},
]
