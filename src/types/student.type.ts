import { IPage } from './page.type'

export interface IStudent {
  name: string
  id: string
  tel: string
  avatar: string
  account: string
}

export type TStudentQuery = Record<string, { __typename?: 'Query'; data: IStudent[]; page: IPage }>
