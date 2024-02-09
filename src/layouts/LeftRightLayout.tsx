import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'
import Menu from '@/components/LeftMenu'
import { LayoutWrapper } from './LeftRightLayout'

const LeftRightLayout: FC = memo(() => {
  return (
    <LayoutWrapper>
      <div className="container">
        <nav className="left">
          <Menu />
        </nav>
        <section className="right">
          <Outlet />
        </section>
      </div>
    </LayoutWrapper>
  )
})

export default LeftRightLayout
