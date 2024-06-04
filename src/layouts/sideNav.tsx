import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { SideNavType } from "../component/interface/all-interface"
import { sideNavSchema } from "../schema/sideNav.schema"

const SideNav = () => {
	const [sidenav] = useState<SideNavType[]>(sideNavSchema)
	const navigation = useNavigate()
	const location = useLocation()

	const navigateTo = (nav: SideNavType) => {
		if (nav?.route) {
			navigation(nav?.route)
		}
	}
	return (
		<div className={`w-full pt-5 pb-10 hideScrollbar bg-primary flex flex-col justify-start items-start overflow-y-scroll gap-3 h-[100vh]`}>
			{sidenav?.length &&
				sidenav.map((nav) => (
					<div key={nav?.label} className="flex  w-full  flex-col gap-2" onClick={() => navigateTo(nav)}>
						<p
							className={`${nav?.route === location.pathname ? "bg-blue-500 text-white" : " text-white  opacity-50"} mx-1 rounded-md pl-5 py-2 text-[15px] cursor-pointer`}
						>
							{nav?.label.charAt(0).toUpperCase() + nav?.label.slice(1).toLowerCase()}
						</p>
						{nav.isActive &&
							nav?.children?.length &&
							nav?.children.map((child) => (
								<Link
									key={child?.label}
									className={`${child?.route === location.pathname ? "bg-blue-500" : ""} mx-4 rounded-md py-2`}
									to={child?.route}
								>
									<p
										className={`${child?.route === location.pathname ? "text-white" : `text-white opacity-50`}   text-[17px] pl-5 `}
									>
										{child?.label.charAt(0).toUpperCase() + child?.label.slice(1).toLowerCase()}
									</p>
								</Link>
							))}
					</div>
				))}
		</div>
	)
}

export default SideNav
