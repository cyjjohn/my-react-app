import { MenuItem, MenuWrapper } from './style'
import PropTypes from 'prop-types'

interface MenuProps {
  onTabClick: (tab: { title: string; url: string }) => void
}

const Menu = ({ onTabClick }: MenuProps) => {
  const handleClick = (title: string, url: string) => {
    onTabClick({ title, url })
  }

  return (
    <MenuWrapper>
      <MenuItem
        onClick={() => handleClick('工作台', `${process.env.REACT_APP_BASE_URL}/dashboard`)}
      >
        工作台
      </MenuItem>
      <MenuItem
        onClick={() => handleClick('报告管理', `${process.env.REACT_APP_BASE_URL}/reports`)}
      >
        报告管理
      </MenuItem>
      {/* 添加更多菜单项 */}
    </MenuWrapper>
  )
}

Menu.propTypes = {
  onTabClick: PropTypes.func.isRequired,
}

export default Menu
