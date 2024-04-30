/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
  useQuery as useApolloQuery,
  useMutation as useApolloMutation,
  OperationVariables,
  DocumentNode,
  QueryHookOptions,
  QueryResult,
  MutationHookOptions,
  MutationTuple,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { AUTH_TOKEN } from './constants'

//拦截器
const httpLink = createHttpLink({
  uri: 'api/graphql',
})
const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem(AUTH_TOKEN) ?? localStorage.getItem(AUTH_TOKEN)

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
  cache: new InMemoryCache({
    addTypename: false,
  }),
})

function useQuery<TData = any, TVariables extends OperationVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>,
): QueryResult<TData, TVariables> {
  const result = useApolloQuery<TData, TVariables>(query, options)

  if (result.error) {
    console.error('GraphQL Query Error:', result.error)
    // 在这里添加更多的错误处理逻辑
  }

  return result
}

function useMutation<TData = any, TVariables = OperationVariables>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>,
): MutationTuple<TData, TVariables> {
  const [mutateFunction, result] = useApolloMutation<TData, TVariables>(mutation, {
    ...options,
    onError: error => {
      console.error('GraphQL Mutation Error:', error)
      // 如果options中定义了onError回调，则也调用它
      if (typeof options?.onError === 'function') {
        options.onError(error)
      }
    },
  })

  return [mutateFunction, result]
}

export { useQuery, useMutation }
