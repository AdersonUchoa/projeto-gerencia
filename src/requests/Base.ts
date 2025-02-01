import { API_URL } from "@/data/url";
import axios from "axios"

const http = axios.create({ baseURL: API_URL }) 

export default http;