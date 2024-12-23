export interface ITodo {
  _id: string
  title: string
  done: boolean
}

export interface INotion {
  _id?: string
  title: string
  todo: ITodo[]
}