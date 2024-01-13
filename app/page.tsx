'use client'

import { Flex, Switch } from 'antd'
import styles from './index.module.scss'
import { useState } from 'react'
import TransactionsListWidget from '@/widgets/TransactionsList'
import TransactionsDiagramWidget from '@/widgets/TransactionsDiagram'
export default function Home() {

	const { container, wrapper, togglerContainer } = styles
	const [isList, setIsList] = useState(true)

	return (
		<main className={wrapper}>
			<section className={container}>
				<h2>Transactions history</h2>

				<Flex className={togglerContainer} justify="space-between" align='center'>
					<span>List</span>
					<Switch defaultChecked={false} onChange={() => setIsList(!isList)} />
					<span>Diagram</span>
				</Flex>

				{isList && <TransactionsListWidget />}
				{!isList && <TransactionsDiagramWidget />}
			</section>
		</main>
	)
}
