import { GET_USER } from '@/graphql/user'
import { IUser } from '@/types/user.type'
import { connectFactory, useAppContext } from '@/utils/contextFactory'
import { useQuery } from '@apollo/client'
import { useLocation, useNavigate } from 'react-router-dom'

const KEY = 'userInfo'
const DEFAULT_VALUE = {}

export const useUserContext = () => useAppContext(KEY)

export const connnect = connectFactory(KEY, DEFAULT_VALUE)

export const useGetUser = () => {
  const { setStore } = useUserContext()
  const nav = useNavigate()
  const { pathname } = useLocation()
  const { loading, refetch } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
    onCompleted: data => {
      debugger
      if (data.getUserInfo) {
        const { id, name, tel, desc, avatar } = data.getUserInfo
        setStore({
          id,
          name,
          tel,
          desc,
          avatar,
          refetch,
        })
        if (pathname.startsWith('/login')) {
          nav('/')
        }
        return
      }
      // 未登录且不在登录页 跳转登录页
      if (pathname !== '/login') {
        setStore({ refetch })
        nav(`/login?orgUrl=${pathname}`)
      }
    },
    onError: () => {
      setStore({ refetch })
      if (pathname !== '/login') {
        nav(`/login?orgUrl=${pathname}`)
      }
    },
  })
  return { loading, refetch }
}
