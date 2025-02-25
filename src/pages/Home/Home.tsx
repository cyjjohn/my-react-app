import { FC, memo } from 'react'
import { HomeWrapper } from './style'

const Home: FC = memo(() => {
  return (
    <HomeWrapper>
      <div className="container">
        <h1>首页</h1>
        <p>欢迎使用</p>
      </div>
    </HomeWrapper>
  )
})
Home.displayName = 'Home'
export default Home
