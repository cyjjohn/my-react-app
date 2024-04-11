import { IPage } from './page.type'

export interface IResult<T> {
  code: number
  message: string
  data?: T
}

export interface IResults<T> {
  code: number
  message: string
  data?: T[]
  page?: IPage
}
