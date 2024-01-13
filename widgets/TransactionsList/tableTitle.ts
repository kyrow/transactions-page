import type { ColumnsType } from 'antd/es/table';
import { DataType } from './types';

export const fieldsTitle: ColumnsType<DataType> = [
	{
		key: 'id',
		title: 'id',
		dataIndex: '_id',
		width: '10%',
		sorter: (a, b) => a._id - b._id,
	},
	{
		key: 'date',
		title: 'date',
		dataIndex: 'date',
		width: '10%'
	},
	{
		key: 'title',
		title: 'title',
		dataIndex: 'title',
		width: '20%',
		sorter: (a, b) => a.title.charAt(0).localeCompare(b.title.charAt(0)),
	},
	{
		key: 'totalAmount',
		title: 'totalAmount',
		dataIndex: 'totalAmount',
		width: '20%',
		sorter: (a, b) => a.totalAmount - b.totalAmount,
	},
	{
		key: 'type',
		title: 'type',
		dataIndex: 'type',
		width: '20%',
	},
	{
		key: 'details',
		title: 'details',
		dataIndex: 'details',
		width: '20%'
	},

];