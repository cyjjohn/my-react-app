import { connnect, useGetUser } from '@/hooks/useHooks'

/**
 * 用户信息
 */
const UserInfo = ({ children }) => {
  useGetUser()
  return <div>{children}</div>
}

export default connnect(UserInfo)
