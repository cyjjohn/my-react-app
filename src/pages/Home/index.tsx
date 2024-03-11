import { FC, memo } from 'react'
import style from './index.module.less'
import { Button } from 'antd'
import { useGoTo } from '@/hooks/useGoTo'
import { ROUTE_KEY } from '@/router'

const Home: FC = memo(() => {
  const { go } = useGoTo()

  return (
    <div className={style.container}>
      <Button onClick={() => go(ROUTE_KEY.MY)}>
        去个人中心
        {/* {store.currentOrg} */}
      </Button>
    </div>
  )
})

export default Home
