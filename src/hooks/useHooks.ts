import { GET_USER } from '@/graphql/user'
import { connectFactory, useAppContext } from '@/utils/contextFactory'
import { useQuery } from '@apollo/client'

const KEY = 'userInfo'
const DEFAULT_VALUE = {}

export const useUserContext = () => useAppContext(KEY)

export const connnect = connectFactory(KEY, DEFAULT_VALUE)

export const useGetUser = () => {
  const { store, setStore } = useUserContext()
  const { loading, refetch } = useQuery(GET_USER, {
    onCompleted: data => {
      if (data.getUserInfo) {
        setStore(data.getUserInfo)
        console.log('store', store)
        return
      }
      window.location.href = '/'
    },
  })
  return { loading }
}
