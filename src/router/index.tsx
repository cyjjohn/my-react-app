import LeftRightLayout from '@/layouts/LeftRightLayout.tsx'
import Epic from '@/pages/Epic/index.tsx'
import Kanban from '@/pages/Kanban/index.tsx'
import Login from '@/pages/Login/index.tsx'
import Project from '@/pages/Project/index.tsx'
import Register from '@/pages/Register/index.tsx'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { NotFound } from './Lazy.tsx'

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
            element: <Kanban />,
          },
          {
            path: 'epic',
            element: <Epic />,
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
