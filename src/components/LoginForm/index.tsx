import { BASE_URL } from '@/services/request/config'
import {
  Input,
  LoginButton,
  LoginDiv,
  LogintImage,
  PasswordLabel,
  UsernameLabel,
  CheckboxLabel,
} from './style'

interface LoginFormProps {
  username: string
  setUsername: (username: string) => void
  password: string
  setPassword: (password: string) => void
  remember: boolean
  setRemember: (remember: boolean) => void
  login: () => void
  isSubmitting: boolean
}

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  remember,
  setRemember,
  login,
  isSubmitting,
}: LoginFormProps) => {
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      login()
    }
  }

  return (
    <LoginDiv>
      <LogintImage src={`${BASE_URL || ''}/img/logint.png`} alt="Login" />
      <UsernameLabel>帐号</UsernameLabel>
      <Input
        type="text"
        id="username"
        placeholder=""
        autoComplete="off"
        $top="12.5vh"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <PasswordLabel>密码</PasswordLabel>
      <Input
        type="password"
        id="password"
        placeholder=""
        $top="22.5vh"
        value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyDown={handleKeyDown} // 添加回车事件监听
      />
      <CheckboxLabel>
        <input
          type="checkbox"
          name="remember"
          id="remember"
          value="remember"
          checked={remember}
          onChange={e => setRemember(e.target.checked)}
        />
        &nbsp;记住密码
      </CheckboxLabel>
      {isSubmitting ? (
        <LoginButton as="span">登录中...</LoginButton>
      ) : (
        <LoginButton href="#" onClick={login}>
          登录
        </LoginButton>
      )}
    </LoginDiv>
  )
}

export default LoginForm
