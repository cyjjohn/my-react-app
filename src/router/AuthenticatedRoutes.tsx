import RequireAuth from '@/hoc/Auth'
import { Outlet } from 'react-router-dom'

const AuthenticatedRoutes = () => {
  return (
    <RequireAuth>
      <Outlet /> {/* 渲染子路由 */}
    </RequireAuth>
  )
}

export default AuthenticatedRoutes
