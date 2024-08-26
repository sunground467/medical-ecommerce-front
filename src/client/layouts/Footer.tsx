import { FaFacebook, FaTwitter } from "react-icons/fa6"
import { SiGmail } from "react-icons/si"
import { Link } from "react-router-dom"

const Footer = () => {
	const footerData = [
		{
			title: "Features",
			links: ["Cool stuff", "Random feature", "Team feature", "Stuff for developers", "Another one", "Last time"]
		},
		{
			title: "Resources",
			links: ["Resource", "Resource name", "Another resource", "Final resource"]
		},
		{
			title: "About",
			links: ["Team", "Locations", "Privacy", "Terms"]
		},
		{
			title: "Help",
			links: ["Support", "Help Center", "Contact Us"]
		}
	]
	return (
		<>
			<div className="w-full flex justify-center items-center">
				<footer className=" w-[80%]  py-8 sm:py-12">
					<div className="container mx-auto px-4">
						<div className="sm:flex sm:flex-wrap sm:-mx-4 md:py-4">
							{footerData.map((section, index) => (
								<div
									key={index}
									className={`px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 ${index !== 0 ? "mt-8 sm:mt-0" : ""}`}
								>
									<h5 className="text-xl font-bold mb-6">{section.title}</h5>
									<ul className="list-none footer-links">
										{section.links.map((link, idx) => (
											<li key={idx} className="mb-2">
												<Link
													to={'/'}
													className="border-b border-solid border-transparent hover:border-primary hover:text-primary"
												>
													{link}
												</Link>
											</li>
										))}
									</ul>
								</div>
							))}
							<div className="px-4 mt-4 sm:w-1/3 xl:w-1/6 sm:mx-auto xl:mt-0 xl:ml-auto">
								<h5 className="text-xl font-bold mb-6 sm:text-center xl:text-left">Stay connected</h5>
								<div className="flex sm:justify-center xl:justify-start">
									<a
										href=""
										className="w-10 h-10 flex justify-center items-center border-2 border-gray-400 rounded-full text-center py-1 text-gray-600 hover:text-white hover:bg-green-400 hover:border-green-400"
									>
										<FaFacebook fontSize={24} />
									</a>
									<a
										href=""
										className="w-10 h-10 flex justify-center items-center border-2 border-gray-400 rounded-full text-center py-1 ml-2 text-gray-600 hover:text-white hover:bg-green-400 hover:border-green-400"
									>
										<FaTwitter fontSize={24} />
									</a>
									<a
										href=""
										className="w-10 h-10 border-2 flex justify-center items-center  border-gray-400 rounded-full text-center py-1 ml-2 text-gray-600 hover:text-white hover:bg-green-400 hover:border-green-400"
									>
										<SiGmail fontSize={24} />
									</a>
								</div>
							</div>
						</div>
					</div>
				</footer>
			</div>
		</>
	)
}

export default Footer
