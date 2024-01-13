import DoughnutDiagramFeature from '@/features/DoughnutDiagram'
import styles from './index.module.scss'
import { fetchProducts } from '@/shared/services/fetchProducts'
import { useQuery } from '@tanstack/react-query'
import { Flex, Spin } from 'antd'
import React from 'react'
import LinearDiagramFeature from '@/features/linearDiagram'
import ReportFeature from '@/features/report'


function TransactionsDiagramWidget() {

	const { DiagramContainer } = styles

	const { data, error, isLoading } = useQuery({
		queryFn: () => fetchProducts(),
		queryKey: ['products'],
	})

	if (isLoading) return <Spin />
	if (error) return 'An error has occurred: ' + error.message

	return (
		<Flex vertical gap='small'>
			<Flex justify='space-between' align='flex-start'>
				<div className={DiagramContainer}>
					<DoughnutDiagramFeature data={data} />
				</div>
				<div className={DiagramContainer}>
					<LinearDiagramFeature data={data} />
				</div>
			</Flex>
			<ReportFeature data={data} />
		</Flex>
	)
}

export default TransactionsDiagramWidget