
export interface IDiagramData {
	labels: string[];
	datasets: IDataset[]
}

interface IDataset {
	label: string
	data: number[]
	backgroundColor: string[]
}
