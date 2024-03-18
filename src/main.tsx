import { client } from '@/utils/apollo.ts'
import { ApolloProvider } from '@apollo/client'
import { App as AntdApp } from 'antd'
import 'normalize.css'
import { FC, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'

export const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <AntdApp>
        <Suspense fallback="">
          {/* router自动创建结构 */}
          <RouterProvider router={router} />
        </Suspense>
      </AntdApp>
    </ApolloProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
