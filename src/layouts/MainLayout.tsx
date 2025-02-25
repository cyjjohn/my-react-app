import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'
import s from './MainLayout.module.scss'

const MainLayout: FC = memo(() => {
  return (
    <div className={s.container}>
      <header className={s.header}>
        <div className={s.left}>
          <div className="logo">logo</div>
        </div>
        <div className={s.right}>
          <div className="userinfo">用户</div>
        </div>
      </header>
      <section className={s.content}>
        <Outlet />
      </section>
      <footer className={s.footer}>&copy; 2024 - {new Date().getFullYear()}. Create by cyj</footer>
    </div>
  )
})
MainLayout.displayName = 'MainLayout' // 用于显示组件名称
export default MainLayout
