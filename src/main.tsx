import { client } from '@/utils/apollo.ts'
import { ApolloProvider } from '@apollo/client'
import 'normalize.css'
import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import UserInfo from './components/UserInfo'

export function App() {
  return (
    <ApolloProvider client={client}>
      <UserInfo>
        <Suspense fallback="Loading...">
          {/* router自动创建结构 */}
          <RouterProvider router={router} />
        </Suspense>
      </UserInfo>
    </ApolloProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
