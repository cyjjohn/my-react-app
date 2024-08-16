import { IPage } from './page.type'
import { ITeacher } from './teacher.type'

export type TWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'
export interface IWeekCourse {
  week: TWeek
  orderTime: IOrderTime[]
}

export interface IOrderTime {
  startTime: string
  endTime: string
  key: number
}

export interface ICourse {
  id: string
  name: string
  desc?: string
  group: string
  baseAbility: string
  limitNumber: number
  duration: number
  reserveInfo?: string
  refundInfo?: string
  otherInfo?: string
  coverUrl?: string
  teachers?: ITeacher[]
  reducibleTime?: IWeekCourse[]
  orgId?: string
}

export type TBaseCourse = Partial<ICourse>

export type TCoursesQuery = Record<string, { __typename?: 'Query'; data: ICourse[]; page: IPage }>

export type TCourseQuery = Record<string, { __typename?: 'Query'; data: ICourse }>
