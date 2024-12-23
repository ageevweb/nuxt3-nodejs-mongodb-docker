import {
  errorResponseHandler,
  successResponseHandler,
} from "./interceptors";

import * as notion from "./notion";

import axios from "axios";
import type { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: `http://localhost:4000/`,
  headers: {},
});

apiClient.interceptors.response.use(successResponseHandler, errorResponseHandler)

export const api = {
  ...notion,
};

export default apiClient;