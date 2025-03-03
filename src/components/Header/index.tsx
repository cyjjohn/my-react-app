import { HeaderWrapper, Logo } from './style'

const Header = () => {
  return (
    <HeaderWrapper>
      {/* 替换为你的Logo */}
      <Logo src={`${process.env.REACT_APP_BASE_URL}/img/logo.png`} alt="Logo" />
      <h1>智能质检系统</h1>
    </HeaderWrapper>
  )
}

export default Header
