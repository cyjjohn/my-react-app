import { LogoImage, LogoWrapper } from './style'

const Logo = () => {
  return (
    <LogoWrapper>
      <LogoImage src={`/img/logo.jpg`} alt="Logo" />
    </LogoWrapper>
  )
}

export default Logo
