import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'
import s from './MainLayout.module.scss'
import Logo from '@/components/Logo'
import PopoverList from '@/components/PopoverList'

const MainLayout: FC = memo(() => {
  return (
    <div className={s.container}>
      <header className={s.header}>
        <div className={s.left}>
          <Logo />
          <PopoverList />
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

export default MainLayout
