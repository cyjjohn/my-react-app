import { Menu, MenuProps } from 'antd'
import { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'

const items = [
  { key: 'kanban', label: '看板' },
  { key: 2, label: 'Option2' },
]

const LeftMenu: FC = memo(() => {
  const nav = useNavigate()

  //菜单点击
  const onClick: MenuProps['onClick'] = e => {
    switch (e.key) {
      case 'kanban':
        nav('/project/1/kanban')
        break
      case 'epic':
        nav('/project/1/epic')
        break
      default:
        break
    }
  }

  return <Menu mode="vertical" items={items} onClick={onClick} />
})

export default LeftMenu
