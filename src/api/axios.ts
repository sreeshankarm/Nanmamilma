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
const environment = token.getEnvironment();

  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }

if (environment) {
    config.headers.environment = environment;
  }
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
