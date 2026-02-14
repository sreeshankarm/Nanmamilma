import axios from "axios";
import { token } from "../utils/token";

const api = axios.create({
  //   baseURL: "https://nanmastagingapi.milma.in",
  baseURL: "/api",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const access = token.getAccess();
  // const env = localStorage.getItem("environment");

  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
    config.headers.environment = 3;
  }

  // if (env) {
  //   config.headers.environment = env;
  // }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      token.clear();
      window.location.href = "/signin";
    }
    return Promise.reject(err);
  },
);

export default api;
