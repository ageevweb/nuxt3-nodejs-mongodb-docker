import type { IResponce } from "../types";
import type { INotion } from "~/types/Notion";

export type INotionResponce = IResponce & { notions: INotion[] }
