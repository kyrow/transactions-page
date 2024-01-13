
import { DataType } from '@/widgets/TransactionsList/types'
import { Flex } from 'antd'
import React, { useEffect, useState } from 'react'
import { IDiagramData } from '../linearDiagram/types'

function ReportFeature({ data }: { data: DataType[] }) {

	const [reportData, setReportData] = useState<DataType[]>()

	useEffect(() => {
		setReportData(data)
	}, [data])

	const uniqueCategoriesCount = new Set(reportData?.map((item) => item.type)).size;
	const totalAmount = reportData?.reduce((acc, item) => acc + item.totalAmount, 0)

	return (
		<>
			<h2>Report:</h2>
			<Flex vertical gap='small'>
				<span>Count of transactions: {reportData?.length}</span>
				<span>Count of categories: {uniqueCategoriesCount}</span>
				<span>Total amount: {totalAmount} ₸ </span>
			</Flex>
		</>
	)

}

export default ReportFeature