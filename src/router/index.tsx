import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { Home, NotFound } from './Lazy.tsx'
import Login from '@/pages/Login/index.tsx'
import Register from '@/pages/Register/index.tsx'
import LeftRightLayout from '@/layouts/LeftRightLayout.tsx'
import Project from '@/pages/Project/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        //项目列表页面
        path: 'project',
        index: true,
        element: <Project />,
      },
      {
        path: 'project/:id',
        element: <LeftRightLayout />,
        children: [
          {
            path: 'kanban',
            element: <Home />,
          },
          {
            path: 'epic',
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
