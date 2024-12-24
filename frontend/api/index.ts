import axios from "axios";
import type { AxiosInstance } from "axios";
import {
  errorResponseHandler,
  successResponseHandler,
} from "./interceptors";

import * as notion from "./notion";


const apiClient: AxiosInstance = axios.create({
  baseURL: `https://api.ageevweb.tech`,
  headers: {},
});

apiClient.interceptors.response.use(successResponseHandler, errorResponseHandler)

export const api = {
  ...notion,
};

export default apiClient;