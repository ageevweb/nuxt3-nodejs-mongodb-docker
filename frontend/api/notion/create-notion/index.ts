import type { IResponce } from '../types';
import type { ICreateNotionPayload} from "./types"
import apiClient from '@/api';

export default async (payload: ICreateNotionPayload) => {
  const REQUEST_URL = `/add-notion`;

  const data = await apiClient.post<
    ICreateNotionPayload,
    IResponce
  >(REQUEST_URL, payload);

  return data;
};


