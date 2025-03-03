import Login from '@/pages/Login/index.tsx'
import { createBrowserRouter } from 'react-router-dom'
import AuthenticatedRoutes from './AuthenticatedRoutes.tsx'
import { Home, NotFound } from './Lazy.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthenticatedRoutes />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/index',
        element: <Home />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router

/* ----- 路由路径常量 ----- */
export const HOME_PATHNAME = '/'
