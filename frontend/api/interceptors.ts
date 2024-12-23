import {
  AxiosError,
  type AxiosResponse,
} from "axios"


export const errorResponseHandler = (error: AxiosError) => {
  showError(error);

  return Promise.reject(error);
};

export const successResponseHandler = (response: AxiosResponse) => {
  return response.data
}
