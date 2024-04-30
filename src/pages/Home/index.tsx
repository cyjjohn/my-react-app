import { useGoTo } from '@/hooks/useRoute'
import { useUserContext } from '@/hooks/useStore'
import { ROUTE_KEY } from '@/router'
import { Button } from 'antd'
import { FC, memo } from 'react'
import style from './index.module.less'

const Home: FC = memo(() => {
  const { go } = useGoTo()
  const { store, setStore } = useUserContext()

  return (
    <div className={style.container}>
      <Button onClick={() => go(ROUTE_KEY.MY)}>
        去个人中心
        {store.currentOrg}
      </Button>
    </div>
  )
})

export default Home
