/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { AUTH_TOKEN } from './constants'

//拦截器
const httpLink = createHttpLink({
  uri: 'api/graphql',
})
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)

  // 返回头部，如果没有token，可能就不添加Authorization头部
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
})
