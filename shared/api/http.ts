import axios from "axios";

const BASE_URL = process.env.API_HOST

const api = axios.create({
	baseURL: BASE_URL,
})

export default api