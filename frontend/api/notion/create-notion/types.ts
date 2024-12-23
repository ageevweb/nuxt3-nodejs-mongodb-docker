import type { ITodo } from "~/types/Notion";

export interface ICreateNotionPayload {
  title: string;
  todo: ITodo[]
}
