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
  const { loading } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
    onCompleted: data => {
      if (data.getUserInfo) {
        const { id, name, tel } = data.getUserInfo
        setStore({
          id,
          name,
          tel,
        })
        if (pathname.startsWith('/login')) {
          nav('/')
        }
        return
      }
      if (pathname !== '/login') {
        nav(`/login?orgUrl=${pathname}`)
      }
    },
    onError: () => {
      if (pathname !== '/login') {
        nav(`/login?orgUrl=${pathname}`)
      }
    },
  })
  return { loading }
}
