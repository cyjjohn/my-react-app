import { FC, memo } from 'react'
import { HomeWrapper } from './style'
import Todo from '@/components/Todo'

const Home: FC = memo(() => {
  return (
    <HomeWrapper>
      <div className="container">
        <h1>首页</h1>
        <p>欢迎使用</p>
        <Todo />
      </div>
    </HomeWrapper>
  )
})

export default Home
