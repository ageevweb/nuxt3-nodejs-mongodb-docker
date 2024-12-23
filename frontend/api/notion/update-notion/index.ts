import apiClient from '@/api';
import type { IResponce } from '../types';
import type { INotion } from '~/types/Notion';


export default async (id: string, payload: INotion ) => {
  const REQUEST_URL = `/edit-notion/${id}`;

  const data = await apiClient.put<
    INotion,
    IResponce
  >(REQUEST_URL, payload);

  return data;
};


