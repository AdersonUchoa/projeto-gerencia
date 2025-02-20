import { API_URL } from "@/data/url";
import axios from "axios"

const http = axios.create({
  baseURL: API_URL, headers: {
    'ngrok-skip-browser-warning': 'true'
  }
})

http.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default http;