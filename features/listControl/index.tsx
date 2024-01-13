import { AutoComplete, Button, DatePicker, Dropdown, Flex, MenuProps } from 'antd'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';

type ListControlProps = {
	inputKeyWord: (word: string) => void
	titlesList: string[]
	fillDates: (arr: string[]) => void
	categoryList: { value: string, key: number }[]
	pickCategory: (categoryArr: string) => void
	reset: () => void
}

const ListControlFeature = ({ inputKeyWord, titlesList, fillDates, categoryList, pickCategory, reset }: ListControlProps) => {
	const [options, setOptions] = useState<{ value: string }[]>([]);
	const { RangePicker } = DatePicker;
	const [dropDownTitle, setDropDownTitle] = useState('Select type of category')

	useEffect(() => {
		setOptions(titlesList.map((title) => ({ value: title })));
		fillDates(['2023-01-01', '2024-01-01'])
	}, [titlesList]);


	const getPanelValue = (searchText: string): { value: string }[] => {
		return !searchText
			? []
			: titlesList
				.filter((title) => title.toLowerCase().includes(searchText.toLowerCase()))
				.map((filteredTitle) => ({ value: filteredTitle }));
	};

	const dateFormat = 'YYYY-MM-DD';

	const items: { value: string; key: number }[] = categoryList.map((category) => ({ value: category.value, key: category.key }));

	const availableItems: { value: string; key: number; label: JSX.Element }[] = items.map((item) => ({
		...item,
		label: <p onClick={() => {
			pickCategory(item.value)
			setDropDownTitle(item.value)
		}}>{item.value}</p>,
	}));


	return (
		<Flex gap='middle' align='center'>
			<RangePicker
				onChange={(dates, dateStrings) => { fillDates(dateStrings) }}
				defaultValue={[dayjs('2023-01-01', dateFormat), dayjs('2024-01-01', dateFormat)]}
			/>
			<AutoComplete
				placeholder='find transaction'
				options={options}
				onSearch={(text) => setOptions(getPanelValue(text))}
				onSelect={(value) => inputKeyWord(value)}
				style={{ width: 200 }}
			/>
			<Dropdown menu={{ items: availableItems }} placement="bottomLeft" arrow>
				<Button>{dropDownTitle}</Button>
			</Dropdown>

			<Button onClick={reset}>Reset</Button>

		</Flex>
	)
}

export default ListControlFeature