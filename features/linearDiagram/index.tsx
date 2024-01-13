import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IDiagramData } from './types';
import { DataType } from '@/widgets/TransactionsList/types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


function LinearDiagramFeature({ data }: { data: DataType | DataType[] }) {
	const [isDiagramData, setDiagramData] = useState<IDiagramData>();

	useEffect(() => {
		if (Array.isArray(data)) {

			const labels = Array.from(new Set(data.map((item) => item.type)))
				.map((category, index) => ({ value: category, key: index + 1 })) as {
					value: string;
					key: number;
				}[];

			const categoryAmounts = data.reduce((acc, item) => {
				acc[item.type] = (acc[item.type] || 0) + item.totalAmount;
				return acc;
			}, {} as Record<string, number>);

			const categoryAmountsArray: number[] = Object.values(categoryAmounts);

			const newData: IDiagramData = {
				labels: labels.map((label) => label.value),
				datasets: [
					{
						data: categoryAmountsArray,
						backgroundColor: [
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 99, 132, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
						],
						label: 'Total Amount',
					},
				],
			};

			setDiagramData(newData);
		}
	}, [data]);


	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'right' as const,
			},
			title: {
				display: true,
				text: 'Total amount by category',
			},
		},
	};

	return (
		<div>
			{isDiagramData ? (
				<Bar options={options} data={isDiagramData} />
			) : null}
		</div>)
}

export default LinearDiagramFeature;
