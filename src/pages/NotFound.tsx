import { Button, Result } from 'antd'
import { memo } from 'react'

const NotFound = memo(() => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉,您访问的页面不存在"
      extra={
        <Button type="primary" href="/">
          回到首页
        </Button>
      }
    />
  )
})

export default NotFound