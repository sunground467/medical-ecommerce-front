import { useState } from "react"
import { FaXbox } from "react-icons/fa"
import { FaUsers } from "react-icons/fa"
import { AiFillProduct } from "react-icons/ai"

const Dashboard = () => {
	const [data] = useState([
		{
			icon: <FaXbox color="#FD0063" fontSize={35} />,
			label: "Total Earning",
			colorCode: "#FD0063",
			value: 1002020
		},
		{
			icon: <FaXbox color="#F23E14" fontSize={35} />,
			label: "Total Order",
			colorCode: "#F23E14",
			value: 40
		},
		{
			icon: <FaUsers color="#6A45FE" fontSize={35} />,
			label: "Total Employers",
			colorCode: "#6A45FE",
			value: 20
		},
		{
			icon: <FaUsers color="#426EFE" fontSize={35} />,
			label: "Total Costomers",
			colorCode: "#426EFE",
			value: 140
		},
		{
			icon: <AiFillProduct color="orange" fontSize={35} />,
			label: "Total Products",
			colorCode: "orange",
			value: 40
		}
	])
	return (
		<div className="w-full">
			<p className="text-primary p-4 text-[20px]">Good Morning, Admin 😊</p>
			<p className="text-primary p-4 text-[20px]">Let's take an overview</p>

			<div className="grid grid-cols-12 px-2 gap-4">
				{data.map((d, i) => (
					<div
						key={i}
						style={{ background: `${d?.colorCode}` }}
						className={`col-span-4 rounded-md py-5 flex items-center justify-evenly gap-3`}
					>
						<div className="w-20 h-20 flex justify-center items-center rounded-full bg-white">{d?.icon}</div>
						<div>
							<p className="text-white text-[20px]">{d?.label}</p>
							<p className="text-white text-center pt-1 text-[20px]">
								{i === 0 ? "Rs." : ""} {d?.value} {i === 0 ? "/-." : ""}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Dashboard
