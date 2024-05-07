import { LOCAL_CURRENT_ORG } from './constants'

export const curOrg = () => {
  let res
  try {
    res = JSON.parse(localStorage.getItem(LOCAL_CURRENT_ORG) ?? '')
  } catch {
    res = { label: '', value: '' }
  }
  return res
}
