import { Menu, MenuProps } from 'antd'
import { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'

const items = [
  { key: 'kanban', label: '看板' },
  { key: 'epic', label: '任务组' },
]

const LeftMenu: FC = memo(() => {
  const nav = useNavigate()

  //菜单点击
  const onClick: MenuProps['onClick'] = e => {
    nav(`/project/1/${e.key}`)
  }

  return <Menu mode="vertical" defaultSelectedKeys={['kanban']} items={items} onClick={onClick} />
})

export default LeftMenu
