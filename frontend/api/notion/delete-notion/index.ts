import apiClient from '@/api';
import type { IResponce } from '../types';


export default async (id: string) => {
  const REQUEST_URL = `/delete-notion/${id}`;

  const data = await apiClient.delete(REQUEST_URL);

  return data;
};


