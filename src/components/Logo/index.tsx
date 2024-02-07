import { FC, memo } from 'react'
import { LogoWrapper } from './style'
import jiraLogo from '@/assets/jira.svg'

const Logo: FC = memo(() => {
  return (
    <LogoWrapper>
      <div className="container">
        <img src={jiraLogo} alt="jira" />
      </div>
    </LogoWrapper>
  )
})

export default Logo
