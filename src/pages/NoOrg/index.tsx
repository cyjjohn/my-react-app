import { useGoTo } from '@/hooks/useRoute'
import { useUserContext } from '@/hooks/useStore'
import { ROUTE_KEY } from '@/router'
import { Button, Result } from 'antd'
import { memo, useEffect } from 'react'

const NoOrg = memo(() => {
  const { store } = useUserContext()
  const { go } = useGoTo()

  useEffect(() => {
    if (store.currentOrg) {
      go(ROUTE_KEY.HOME)
    }
  }, [store.currentOrg])

  return (
    <Result
      status="404"
      title="请选择门店"
      subTitle="所有的管理行为都是基于您选择的门店"
      extra={
        <Button type="primary" href="/">
          回到首页
        </Button>
      }
    />
  )
})

export default NoOrg
