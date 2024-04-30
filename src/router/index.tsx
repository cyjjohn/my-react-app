import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Login from '@/pages/Login/index.tsx'
import My from '@/pages/My/index.tsx'
import { NotFound } from './Lazy'
import Home from '@/pages/Home'
import UserInfo from '@/components/UserInfo'
import Org from '@/pages/Org'
import NoOrg from '@/pages/NoOrg'
import Course from '@/pages/Course'

export const ROUTE_KEY = {
  HOME: 'home',
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
    element: (
      <UserInfo>
        <MainLayout />
      </UserInfo>
    ),
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
        element: <Org />,
      },
      {
        path: ROUTE_KEY.COURSE,
        element: <Course />,
      },
      {
        path: ROUTE_KEY.NO_ORG,
        element: <NoOrg />,
      },
      {
        path: ROUTE_KEY.STUDENT,
        element: <Home />,
      },
    ],
  },
  {
    path: ROUTE_KEY.LOGIN,
    element: (
      <UserInfo>
        <Login />
      </UserInfo>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router

/* ----- 路由路径常量 ----- */
export const HOME_PATHNAME = '/'
