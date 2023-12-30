import axios from "axios";
// import { useNavigate } from 'react-router'
// import { toast } from "react-toastify";

const API_BASE_URL = `https://dev.snowflakeclub.org/`;
// admin

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to set the authentication header
axiosInstance.interceptors.request.use(async (config) => {
  config.headers["Accept"] = `application/json`;
  config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
  config.headers["Content-Type"] = "multipart/form-data";
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //  console.log("error interceptor", error.response.status)
    if (error.response.status === 401) {
      window.location.href = "/";
      localStorage.removeItem("token");
      // toast.error("Login First!");
    }
    return Promise.reject(error);
  }
);

export const api = {
  // get url use
  get(url) {
    return axiosInstance.get(url);
  },
  // post url use
  post(url, data) {
    return axiosInstance.post(url, data);
  },
  // delete url use
  delete(url, id) {
    return axiosInstance.delete(url, id);
  },
};
