import apiClient from '@/api';
import type { INotionResponce } from './types.ts'

export default async () => {
  const REQUEST_URL = `/notion-list`;

  const data = await apiClient.get<void, INotionResponce>(REQUEST_URL);

  return data;
};
