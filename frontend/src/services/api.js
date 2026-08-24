import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getLogs = async () => {
  const response = await API.get("/logs");
  return response.data;
};

export const createLog = async (log) => {
  const response = await API.post("/logs", log);
  return response.data;
};

export default API;