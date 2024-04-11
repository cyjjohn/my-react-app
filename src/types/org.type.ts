import { IPage } from './page.type'

/**
 * 门店图片
 */
export interface IMedia {
  id: string
  url: string
  remark: string
}

/**
 * 门店
 */
export interface IOrganization {
  id: string
  orgFrontImg?: IMedia[]
  orgRoomImg?: IMedia[]
  orgOtherImg?: IMedia[]
  name: string
  logo: string
  tags?: string
  description?: string
  address?: string
  tel?: string
  longitude?: string
  latitude?: string
  identityCardBackImg: string
  identityCardFrontImg: string
  businessLicense: string
}

export type TBaseOrganization = Partial<IOrganization>

export type TOrgsQuery = Record<
  string,
  { __typename?: 'Query'; data: IOrganization[]; page: IPage }
>

export type TOrgQuery = Record<string, { __typename?: 'Query'; data: IOrganization }>
