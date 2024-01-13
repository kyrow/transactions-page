export interface IDoughnutData {
	labels: string[];
	datasets: IDataset[]
}

interface IDataset {
	label: string
	data: number[]
	backgroundColor: string[]
}