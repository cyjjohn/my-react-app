import { Tag } from 'antd'

export const AUTH_TOKEN = 'auth_token'
export const DEFAULT_PAGE_SIZE = 10
export const LOCAL_CURRENT_ORG = 'LOCAL_CURRENT_ORG'

export const CARD_TYPE = {
  TIME: 'time',
  DURATION: 'duration',
}
export const getCardName = (type: string) => {
  switch (type) {
    case CARD_TYPE.TIME:
      return <Tag color="blue">次卡</Tag>
    case CARD_TYPE.DURATION:
      return <Tag color="green">时长卡</Tag>
  }
}
