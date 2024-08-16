import { IPage } from './page.type'

export interface ITeacher {
  id: string
  name: string
}

export type TTeachersQuery = Record<string, { __typename?: 'Query'; data: ITeacher[]; page: IPage }>
