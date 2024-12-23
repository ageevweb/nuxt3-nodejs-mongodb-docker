import apiClient from '@/api';
import type { INotionOneResponce } from './types.ts'

export default async (id: string) => {
  const REQUEST_URL = `/notion/${id}`;

  const data = await apiClient.get<void, INotionOneResponce>(REQUEST_URL);

  return data;
};
