
import axios from "axios";
import type { AxiosInstance } from "axios";
import {
  errorResponseHandler,
  successResponseHandler,
} from "./interceptors";

import * as notion from "./notion";



const domainUrl = window?.env.API_BASE_URL


const apiClient: AxiosInstance = axios.create({
  baseURL: domainUrl,
  headers: {},
});

apiClient.interceptors.response.use(successResponseHandler, errorResponseHandler)

export const api = {
  ...notion,
};

export default apiClient;