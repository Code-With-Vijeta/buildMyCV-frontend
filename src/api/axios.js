import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // use .env variable
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // needed if your backend sends cookies
});

// Add token automatically if logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
