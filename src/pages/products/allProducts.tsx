import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ColumnType } from "../../component/enums/enum"
import { commonDeleteFunc } from "../../redux/action/commonAction"
import { getAllProducts } from "../../redux/action/productAction"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import Table from "../../reusable/table"

const AllProducts = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [search, setSearch] = useState<any>("")
	const [limit, setLimit] = useState<number>(5)
	const [page, setPage] = useState<number>(1)

	const { allProducts, loading, loaded } = useAppSelector((state) => state.product)

	const setPropValForLink = (val: any) => {
		navigate(`/single-product/${val?.data?._id}`)
	}

	const deleteProductVal = (val: string) => {
		dispatch(commonDeleteFunc("deleteProduct", val))
	}

	const obj = {
		_id: "6659682e4e0ecc14b065db7a",
		prodImg: "",
		prodName: "Homeopathy Am 500",
		categoryName: "Homeopathy",
		costPrice: 400,
		mrpRate: 500,
		sellingPrice: 425,
		isPrescription: true,
		isDiscount: true,
		discountPerCentage: 15,
		stock: 0,
		createdAt: "",
		updatedAt: ""
	}
	const customColumnsClass = {
		_id: { className: "w-[300px] text-center", isView: true },
		prodImg: { className: "w-[250px] flex justify-center", columnType: ColumnType.IMAGE },
		isPrescription: { columnType: ColumnType.BOOLEAN },
		isDiscount: { columnType: ColumnType.BOOLEAN },
		createdAt: { columnType: ColumnType.DATE },
		updatedAt: { columnType: ColumnType.DATE }
	}

	const getProducts = (val: any) => {
		dispatch(getAllProducts(val?.searchInput, val?.currentPage, val?.limit))
	}

	useEffect(() => {
		if (!loaded) dispatch(getAllProducts("", 1, 5))
	}, [loaded])

	return (
		<div className="grid grid-cols-12 gap-4 p-4">
			<div className="col-span-12">
				<Table
					title="All products"
					obj={obj}
					tableData={allProducts}
					customColumns={customColumnsClass}
					setPropValForLink={setPropValForLink}
					deleteVal={deleteProductVal}
					loading={loading}
					callApi={getProducts}
					page={page}
					setPage={setPage}
					limit={limit}
					setLimit={setLimit}
					searchInput={search}
					setSearchInputVal={setSearch}
				/>
			</div>
			<div className="col-span-12">
				{/* <Chart
					darkMode={darkMode}
					title="Products created in months"
					chartName="bar"
					height="h-[450px]"
					chartData={barChartData(prod)}
				/> */}
			</div>
			<div className="col-span-12 pb-16">
				{/* <Chart
					darkMode={darkMode}
					title="Total Products created in months "
					chartName="line"
					height="h-[600px]"
					chartData={lineChartData()}
				/> */}
			</div>
		</div>
	)
}

export default AllProducts
