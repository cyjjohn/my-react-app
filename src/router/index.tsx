import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { Home, NotFound } from './Lazy.tsx'
import Login from '@/pages/Login/index.tsx'
import My from '@/pages/My/index.tsx'

export const ROUTE_KEY = {
  HOME: '',
  MY: 'my',
  ORG: 'org',
  COURSE: 'course',
  STUDENT: 'student',
  NO_ORG: 'noOrg',
  PAGE_404: 'p404',
  LOGIN: 'login',
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: ROUTE_KEY.HOME,
        element: <Home />,
      },
      {
        path: ROUTE_KEY.MY,
        element: <My />,
      },
      {
        path: ROUTE_KEY.ORG,
        element: <Home />,
      },
      {
        path: ROUTE_KEY.COURSE,
        element: <Home />,
      },
      {
        path: ROUTE_KEY.NO_ORG,
        element: <Home />,
      },
      {
        path: ROUTE_KEY.STUDENT,
        element: <Home />,
      },
      {
        path: ROUTE_KEY.LOGIN,
        element: <Login />,
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
