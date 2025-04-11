import { Link, useNavigate } from "react-router-dom"
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import { titleCasePipe } from "../../../pipes/pipes"
import { useAppSelector } from "../../../redux/store"
import LazyLoadImage from "../../../reusable/LazyLoadImage"
import Loader from "../../../component/Loader/Loader"

const MainHome = () => {
	const { allCategoryMainTitle, allSubCategory, loading } = useAppSelector((state) => state.category)

	const navigate = useNavigate()

	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 2000,
		cssEase: "linear"
	}

	const data = [
		{
			img: "/images/caro1.jpg"
		},
		{
			img: "/images/caro2.jpg"
		}
	]

	return loading ? (
		<div className="w-full flex justify-center items-center h-[500px]">
			<Loader />
		</div>
	) : (
		<div className="w-full flex flex-col gap-10 justify-center items-center  my-10 pb-10">
			{/* <GooglePage /> */}
			<Slider className="w-[90%] h-[350px] overflow-hidden" {...settings}>
				{data?.map((d, i) => (
					<div key={i} className="">
						<LazyLoadImage src={d?.img} className="w-full object-cover h-[350px]" alt={"image.png"} />
					</div>
				))}
			</Slider>

			<div className="w-[90%] bg-white rounded-md p-4">
				<div className="flex justify-between">
					<p className="text-[30px] tracking-wider text-primary">
						{" "}
						{titleCasePipe(allCategoryMainTitle?.[0]?.categoryTitle)}{" "}
					</p>
					<Link to={"/search-product"}>View All</Link>
				</div>

				<div className="grid grid-cols-12 mt-10 gap-4">
					{allSubCategory?.map((sub: any, i: number) =>
						allCategoryMainTitle?.[0]?.categoryTitle === sub?.forCategoryMainTitle ? (
							<div
								onClick={() => navigate(`/categoryProd?category=${encodeURIComponent(sub?.subcategoryName)}`)}
								key={i}
								className="col-span-3 max-sm:col-span-12 cursor-pointer flex flex-col items-center justify-start"
							>
								<div className="w-[150px] h-[150px] mb-4">
									<LazyLoadImage
										src={sub?.subCategoryImg}
										className="w-[150px] h-[150px] object-cover"
										alt={sub?.subcategoryName}
									/>
								</div>
								<div>
									<p className="text-primary text-[18px]">{sub?.subcategoryName}</p>
								</div>
							</div>
						) : null
					)}
				</div>
			</div>
		</div>
	)
}

export default MainHome
