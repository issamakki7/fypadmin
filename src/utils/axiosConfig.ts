import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    return await requestWithToken(config);
  } catch (error: any) {
    console.log("error");
  }
});

async function requestWithToken(config: any) {

  if (true) {
    config.headers.Authorization = `Bearer `;
  }
  return config;
}

export default axiosInstance;
