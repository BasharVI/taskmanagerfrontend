import axios from "axios";
const baseURL = "https://taskmanagerapi-g34h.onrender.com";

const api = axios.create({
  baseURL: baseURL,
});

export default api;
