import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = memo(() => {
  const nav = useNavigate()

  return <p onClick={() => nav('/')}>抱歉，您访问的页面不存在</p>
})

NotFound.displayName = 'NotFound'
export default NotFound
