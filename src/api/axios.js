import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // https://buildmycv-backend.onrender.com/api
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // important for cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
