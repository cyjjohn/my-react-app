import Cookies from 'js-cookie'
import { PropChildrenType } from '@/types/common.type'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

// 检查用户是否已登录
const RequireAuth = ({ children }: PropChildrenType) => {
  const isAuthenticated = !!Cookies.get('loginby') || !!Cookies.get('userInfo') // 检查 cookies 中是否存在用户信息
  const nav = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!isAuthenticated) {
      // 用户未登录，重定向到登录页面
      nav('/login')
    } else {
      if (pathname === '/') {
        nav('/index')
      }
    }
  }, [])

  return children // 用户已登录，返回子组件
}

export default RequireAuth
