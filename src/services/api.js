import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export async function generateSpec(data) {
  try {
    const response = await api.post("/generate", data);
    return response.data;
  } catch (error) {
    console.error("generateSpec error:", error);
    throw error;
  }
}

export async function getRecentSpecs() {
  try {
    const response = await api.get("/specs/recent");
    return response.data;
  } catch (error) {
    console.error("getRecentSpecs error:", error);
    throw error;
  }
}

export async function getSpecById(id) {
  try {
    const response = await api.get(`/spec/${id}`);
    return response.data;
  } catch (error) {
    console.error("getSpecById error:", error);
    throw error;
  }
}
