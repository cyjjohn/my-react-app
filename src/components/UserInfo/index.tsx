import { connnect, useGetUser } from '@/hooks/useHooks'
import { Spin } from 'antd'

/**
 * 用户信息
 */
const UserInfo = ({ children }) => {
  const { loading } = useGetUser()
  return (
    <Spin spinning={loading}>
      <div>{children}</div>
    </Spin>
  )
}

export default connnect(UserInfo)
