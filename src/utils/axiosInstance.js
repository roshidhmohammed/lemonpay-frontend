import axios from "axios";

export const axisoInstance = axios.create({
  baseURL: import.meta.env.VITE_ENV_BACKEND_URL,
});
