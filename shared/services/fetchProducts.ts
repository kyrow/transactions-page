
'use server'

import api from "../api/http";

export const fetchProducts = async () => {
	try {
		const response = await api.get('/api/transactions');
		console.log(response)
		return response.data;
	} catch (error) {
		console.warn(error);
	}
}

