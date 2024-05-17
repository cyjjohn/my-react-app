export interface IConsumeCard {
  id?: string
  name: string
  type: string
  time: number
  validateDay: number
  courseId?: string
  orgId?: string
}

export type TBaseConsumeCard = Partial<IConsumeCard>

export type TConsumeCardsQuery = Record<string, { __typename?: 'Query'; data: IConsumeCard[] }>

export type TConsumeCardQuery = Record<string, { __typename?: 'Query'; data: IConsumeCard }>
