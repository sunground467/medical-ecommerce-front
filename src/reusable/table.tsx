import { useEffect, useState } from "react"
import { CiEdit, CiSearch } from "react-icons/ci"
import { FaCheck } from "react-icons/fa6"
import { MdOutlineDelete } from "react-icons/md"
import { RxCross1 } from "react-icons/rx"
import { ColumnType } from "../component/enums/enum"
import { ColumnHeader, FormField } from "../component/interface/all-interface"
import { dateFormat, titleCasePipe } from "../pipes/pipes"
import Form from "./form"
import { DotsLoader } from "./DotsLoader"

const Table = ({
	title,
	obj,
	tableData,
	customColumns,
	setPropValForLink,
	deleteVal,
	isEditBtn,
	formData,
	formTitle,
	submiteFormEvent,
	loading,

	callApi,
	searchInput,
	setSearchInputVal,
	page,
	setPage,
	limit,
	setLimit
}: {
	title: string
	obj: any
	tableData: any[]
	customColumns: any
	setPropValForLink?: any
	deleteVal?: any
	isEditBtn?: boolean
	formData?: FormField[]
	formTitle?: string
	submiteFormEvent?: Function
	loading?: boolean

	callApi: Function

	searchInput: string
	setSearchInputVal: any
	page: number
	setPage: any
	limit: number
	setLimit: any
}) => {
	const [dropFilter] = useState<number[]>([5, 10, 25, 100])
	const [openModal, seTOpenModal] = useState<boolean>(false)
	const [openEditModal, seTOpenEditModal] = useState<boolean>(false)
	const [valueData, SetValueData] = useState<any>({})

	useEffect(() => {
		filterDataFunc()
	}, [tableData.length])

	const flattenObject = (obj: { [key: string]: any }, parentKey = "", result: { [key: string]: any } = {}) => {
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				const propName = parentKey ? `${parentKey}.${key}` : key
				if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
					flattenObject(obj[key], propName, result)
				} else {
					result[propName] = obj[key]
				}
			}
		}

		return result
	}

	const createColumnHeader = (obj: { [key: string]: any }) => {
		let columneHeaderArr: any[] = []
		columneHeaderArr = Object.keys(flattenObject(obj)).map((key) => ({
			columnHeader: key.split(".").pop(),
			propName: key
		}))

		return columneHeaderArr
	}

	let columnHeader: ColumnHeader[] = createColumnHeader(obj)

	if (columnHeader?.length && Object.keys(customColumns).length) {
		columnHeader.map((head) => {
			const customProps = customColumns?.[head?.propName]
			if (customProps) {
				head.className = customProps?.className
				head.columnType = customProps?.columnType
				head.isView = customProps?.isView
			}
		})
	}

	const filterDataFunc = (val?: string) => {
		if (setSearchInputVal && val) {
			setSearchInputVal(val)
		}
	}

	useEffect(() => {
		if (searchInput) {
			const handler = setTimeout(() => {
				callApi({ searchInput, currentPage: page, limit })
			}, 1500)

			return () => {
				clearTimeout(handler)
			}
		}
	}, [searchInput])

	const nextPage = () => {
		if (page) {
			setPage((prev: number) => prev + 1)
			const currentPage = page + 1
			callApi({ searchInput, currentPage, limit })
		}
	}
	const prevPage = () => {
		if (page && page > 1) {
			setPage((prev: number) => prev - 1)
			const currentPage = page - 1
			callApi({ searchInput, currentPage, limit })
		}
	}

	const selectDropFilter = (val: number) => {
		setLimit(val)
		callApi({ searchInput, currentPage: page, limit: val })
	}

	const SubmitTheForm = (form: any) => {
		if (valueData && submiteFormEvent) {
			submiteFormEvent({ valueData, form })
			seTOpenEditModal(false)
		}
	}

	const returnAllTableData = (data: any, i: number) => {
		const flatData = flattenObject(data)

		return (
			<tr key={i}>
				{columnHeader.map((col, colIndex) => (
					<td className={`border `} key={colIndex}>
						<div>
							{(() => {
								switch (col.columnType) {
									case ColumnType.IMAGE:
										return (
											<div className={`${col?.className ? col.className : "w-[300px]"} text-center`}>
												<img
													className="w-[50px] h-[50px] object-contain"
													src={flatData[col.propName]}
													alt="Image"
												/>
											</div>
										)
									case ColumnType.BOOLEAN:
										return (
											<div
												className={`${col?.className ? col.className : "w-[300px]"} flex justify-center items-center`}
											>
												{flatData[col.propName] ? <FaCheck color="green" /> : <RxCross1 color="red" />}
											</div>
										)
									case ColumnType.DATE:
										return (
											<div
												className={`${col?.className ? col.className : "w-[300px]"} text-gray-500 flex justify-center items-center`}
											>
												{dateFormat(flatData[col.propName])}
											</div>
										)
									default:
										return (
											<div
												onClick={() =>
													setPropValForLink && col.isView
														? setPropValForLink({ key: col.propName, data: flatData })
														: null
												}
												className={`${col?.className ? col.className : "w-[300px]"} text-center text-sm font-medium ${col?.isView ? "text-blue-500 underline" : "text-gray-500"} `}
											>
												{flatData[col.propName]}
											</div>
										)
								}
							})()}
						</div>
					</td>
				))}
				<td>
					<div className="flex px-4 gap-4 border justify-center items-center">
						{isEditBtn && (
							<button
								onClick={() => {
									seTOpenEditModal(true)
									SetValueData(data)
								}}
								className="mt-2 pb-4"
							>
								<CiEdit color="blue" fontSize={30} />
							</button>
						)}
						<button
							onClick={() => {
								seTOpenModal(true)
								SetValueData(data)
							}}
							className="mt-2 pb-4"
						>
							<MdOutlineDelete color="red" fontSize={30} />
						</button>
					</div>
				</td>
			</tr>
		)
	}

	return (
		<div className="w-full ">
			<div className={`w-full bg-white rounded-md mx-auto`}>
				<div className="flex max-sm:flex-col sm:justify-between sm:items-center px-4 pt-4">
					<div>
						<p className="p-4 text-gray-400">{title}</p>
					</div>
					<div className={`bg-gray-200 flex items-center gap-4 px-4 rounded-md overflow-hidden`}>
						<CiSearch fontSize={24} color="gray" />
						<input
							onChange={(e) => filterDataFunc(e.target.value)}
							type="text"
							className={`w-full bg-gray-200 content border-none outline-none p-2 overflow-hidden`}
							placeholder="Search here"
						/>
					</div>
				</div>
				<div className={`w-full overflow-auto ${limit > 5 && tableData.length > 5 ? "h-[95vh]" : "min-h-[350px]"}  `}>
					{loading ? (
						<div
							className={`w-full flex items-center justify-center bg-opacity-70 overflow-auto bg-primary ${limit > 5 && tableData.length > 5 ? "h-[95vh]" : "min-h-[350px]"}  `}
						>
							<DotsLoader />
						</div>
					) : (
						<>
							<table className="w-full">
								<thead>
									<tr>
										{columnHeader.length > 0 &&
											columnHeader.map((col, index) => (
												<th key={index}>
													<div
														className={`${col?.className ? col.className : "w-[300px]"} text-center text-[15px] font-medium text-gray-500  tracking-wider`}
													>
														{titleCasePipe(col.columnHeader)}
													</div>
												</th>
											))}
									</tr>
								</thead>
								<tbody>
									{tableData.length
										? tableData.map((data: any, i: number) => returnAllTableData(data, i))
										: null}
								</tbody>
							</table>
							{!tableData.length ? (
								<div className="w-full">
									<p className="content text-center pt-10"> No data found </p>
								</div>
							) : null}
						</>
					)}
				</div>
				<div className="w-full flex max-sm:flex-col max-sm:p-4 max-sm:items-end   justify-end items-center gap-4">
					<div>
						<select
							onChange={(e) => selectDropFilter(Number(e.target.value))}
							className={`bg-gray-200 px-3 py-1 rounded-md border-none outline-none`}
							name=""
							id=""
						>
							{dropFilter.map((dr: number, i: number) => {
								return (
									<option className={`text-black`} key={i} value={dr}>
										{dr}
									</option>
								)
							})}
						</select>
					</div>
					<div className="flex p-4 max-sm:p-0 justify-center items-center gap-4">
						<button
							disabled={page === 1}
							onClick={() => prevPage()}
							className={`${page === 1 ? "bg-opacity-50" : ""}  bg-primary text-white rounded-md px-6 py-1 `}
						>
							{" "}
							Prev{" "}
						</button>
						<p className={`content w-[50px] text-black text-center`}>{page}</p>
						<button onClick={() => nextPage()} className={` bg-primary text-white rounded-md px-6 py-1`}>
							{" "}
							Next{" "}
						</button>
					</div>
				</div>
			</div>

			{openEditModal && formTitle && formData ? (
				<div className="w-full h-[100vh] bg-black  top-0 left-0 fixed bg-opacity-30 flex justify-center items-center">
					<div className="w-[500px] bg-white p-4 z-10 rounded-md relative h-fit">
						<button
							onClick={() => seTOpenEditModal(false)}
							className="bg-red-500 absolute p-1 top-1 right-2 w-10 h-10 rounded-full px-4 text-white"
						>
							X
						</button>
						<Form formData={formData} title={formTitle} submiteFormEvent={SubmitTheForm} btnName="Update" />
					</div>
				</div>
			) : null}

			{openModal ? (
				<div className="w-full h-[100vh] bg-black  top-0 left-0 fixed bg-opacity-30 flex justify-center items-center">
					<div className="w-[500px] bg-white z-10 rounded-md relative h-[200px]">
						<p className="pt-20 text-center opacity-70">Are you sure you want to delete this ??</p>
						<div className="absolute right-2 bottom-2 flex gap-4">
							<button
								onClick={() => {
									deleteVal(valueData)
									seTOpenModal(false)
								}}
								className="bg-red-500 p-1  rounded-md px-4 text-white"
							>
								Yes
							</button>
							<button onClick={() => seTOpenModal(false)} className="bg-green-500 p-1  rounded-md px-4 text-white">
								No
							</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default Table
