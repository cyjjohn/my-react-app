import { ICard } from './card.type'
import { IPage } from './page.type'

export interface IProduct {
  id: string
  createdAt: Date
  name: string
  status: string
  stock: number
  curStock: number
  sellNumber: number
  limitBuyNumber: number
  coverUrl: string
  bannerUrl: string
  originalPrice: number
  preferentialPrice: number
  cards: ICard[]
}

export type TBaseProduct = Partial<IProduct>

export type TProductsQuery = Record<string, { __typename?: 'Query'; data: IProduct[]; page: IPage }>

export type TProductQuery = Record<string, { __typename?: 'Query'; data: IProduct }>

export interface IProductType {
  key: string
  title: string
}

export type TProductTypesQuery = Record<string, { __typename?: 'Query'; data: IProductType[] }>
