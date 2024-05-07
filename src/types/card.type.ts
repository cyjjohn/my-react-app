export interface ICard {
  id?: string
  name: string
  type: string
  time: number
  validateDay: number
  courseId?: string
  orgId?: string
}

export type TBaseCard = Partial<ICard>

export type TCardsQuery = Record<string, { __typename?: 'Query'; data: ICard[] }>

export type TCardQuery = Record<string, { __typename?: 'Query'; data: ICard }>
