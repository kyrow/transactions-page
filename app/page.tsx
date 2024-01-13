'use client'

import { Flex, Switch } from 'antd'
import styles from './index.module.scss'
import { useState } from 'react'
import TransactionsListWidget from '@/widgets/TransactionsList'
export default function Home() {

	const { container, wrapper, togglerContainer } = styles
	const [isList, setIsList] = useState(true)

	return (
		<main className={wrapper}>
			<section className={container}>
				<h2>Transactions history</h2>

				<Flex className={togglerContainer} justify="space-between" align='center'>
					<span>List</span>
					<Switch defaultChecked />
					<span>Diagram</span>
				</Flex>

				<TransactionsListWidget />
			</section>
		</main>
	)
}
