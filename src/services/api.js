import axios from "axios";

const API = axios.create({
  baseURL: "https://task-generator-api.onrender.com/api",
  timeout: 130000,
});

export default API;
