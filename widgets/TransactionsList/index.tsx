'use client'

import { fetchProducts } from '@/shared/services/fetchProducts';
import { useQuery } from '@tanstack/react-query';
import { Flex, Modal, Spin, Table, TableProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { DataType } from './types';
import { fieldsTitle } from './tableTitle';
import ListControlFeature from '@/features/listControl';

function TransactionsListWidget() {

	const { data, error, isLoading, isSuccess } = useQuery({
		queryFn: () => fetchProducts(),
		queryKey: ['products'],
	})

	const [receivedData, setReceivedData] = useState<DataType[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [productDetails, setProductDetails] = useState({} as DataType);
	const [keyWord, setKeyWord] = useState('')
	const [titlesList, setTitlesList] = useState<string[]>([])
	const [categoryList, setCategoryList] = useState<{ value: string, key: number }[]>([])
	const [pickedCategory, setPickedCategory] = useState('')
	const [arrayOfDates, setArrayofDates] = useState<string[]>([])


	useEffect(() => {

		setReceivedData(data)
		const uniqueTitles = Array.from(new Set(receivedData && receivedData.map((item: DataType) => item.title))) as string[];
		const categoryNames = Array.from(new Set(receivedData?.map((item: DataType) => item.type)))
			.map((category, index) => ({ value: category, key: index + 1 })) as { value: string; key: number }[];


		setTitlesList(uniqueTitles);
		setCategoryList(categoryNames);
	}, [receivedData, data]);

	const handleClick = (record: DataType) => {
		setProductDetails(record);
		setIsModalOpen(true)
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const inputKeyWord = (word: string) => {
		setKeyWord(word)
	}

	const fillDates = (arrDate: string[]) => {
		setArrayofDates(arrDate)
	}

	const pickCategory = (category: string) => {
		setPickedCategory(category)
	}

	const reset = () => {
		setKeyWord('')
		setPickedCategory('')
		setArrayofDates(['2023-01-01', '2024-01-01'])
	}

	const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	if (isLoading) return <Spin />
	if (error) return 'An error has occurred: ' + error.message

	const filteredData = data.filter((item: DataType) => {
		const isTitleMatch = item.title.toLowerCase().includes(keyWord.toLowerCase());
		const isCorrectType = item.type.toLowerCase().includes(pickedCategory.toLowerCase())

		const isDateInRange =
			arrayOfDates.length === 2 &&
			new Date(item.date) >= new Date(arrayOfDates[0]) &&
			new Date(item.date) <= new Date(arrayOfDates[1]);

		return isTitleMatch && isCorrectType && isDateInRange;
	});

	return (
		<Flex vertical gap='small'>
			<ListControlFeature
				inputKeyWord={inputKeyWord}
				titlesList={titlesList}
				fillDates={fillDates}
				categoryList={categoryList}
				pickCategory={pickCategory}
				reset={reset}
			/>
			<Table
				columns={fieldsTitle}
				dataSource={isSuccess && filteredData}
				rowKey={(record) => record._id.toString()}
				onChange={onChange}
				onRow={record => ({
					onClick: () => handleClick(record),
				})}
			/>
			<Modal title={productDetails.title} open={isModalOpen} onCancel={handleCancel} footer={null}>
				<Flex vertical gap='small'>
					<span>Date: {productDetails.date}</span>
					<span>Price: {productDetails.totalAmount} tenge</span>
					<span>Category: {productDetails.type}</span>
					<span>Details: {productDetails.details}</span>
				</Flex>
			</Modal>
		</Flex>
	)
}

export default TransactionsListWidget