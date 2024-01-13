import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { IDoughnutData } from './types';
import { DataType } from '@/widgets/TransactionsList/types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

function DoughnutDiagramFeature({ data }: { data: DataType | DataType[] }) {
	const [doughnutData, setDoughnutData] = useState<IDoughnutData>();
	ChartJS.register(ArcElement, Tooltip, Legend);

	useEffect(() => {
		if (Array.isArray(data)) {

			const labels = Array.from(new Set(data.map((item) => item.type)))
				.map((category, index) => ({ value: category, key: index + 1 })) as {
					value: string;
					key: number;
				}[];

			const typeCount = data.reduce((acc, item) => {
				acc[item.type] = (acc[item.type] || 0) + 1;
				return acc;
			}, {} as Record<string, number>);


			const newData: IDoughnutData = {
				labels: labels.map((label) => label.value),
				datasets: [
					{
						data: labels.map((label) => typeCount[label.value] || 0),
						backgroundColor: [
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 99, 132, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
						],
						label: 'Total Items',
					},
				],
			};

			setDoughnutData(newData);
		}
	}, [data]);

	if (!doughnutData) {
		return null;
	}

	return <Doughnut data={doughnutData} />;
}

export default DoughnutDiagramFeature;
