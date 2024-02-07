import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { Home, NotFound } from './Lazy.tsx'
import Login from '@/pages/Login/index.tsx'
import Register from '@/pages/Register/index.tsx'
import LeftRightLayout from '@/layouts/LeftRightLayout.tsx'
import Project from '@/pages/Project/index.tsx'

const router = createBrowserRouter([
  {
    // path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/projects',
        element: <LeftRightLayout />,
        children: [
          {
            //项目列表页面
            path: '',
            element: <Project />,
          },
          {
            path: ':id/kanban',
            element: <Home />,
          },
          {
            path: ':id/epic',
            element: <Home />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router

/* ----- 路由路径常量 ----- */
export const HOME_PATHNAME = '/'
