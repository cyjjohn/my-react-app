import request from '@/services/request'
import Cookies from 'js-cookie'
import JSEncrypt from 'jsencrypt'
import { useEffect, useState } from 'react'
import { LoginBgWrapper, LoginPageWrapper } from './style'
import Logo from '@/components/Logo/Logo'
import ErrorMessage from '@/components/ErrorMessage'
import LoginForm from '@/components/LoginForm'
import Footer from '@/components/Footer/index'
import { BASE_URL } from '@/services/request/config'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const nav = useNavigate()

  useEffect(() => {
    const userInfo = Cookies.get('userInfo')
    if (userInfo) {
      nav('/index')
      // try {
      //     const decodedUserInfo = atob(userInfo); // 使用atob解码，替代 $.base64.decode
      //     const [storedUsername, storedPassword] = decodedUserInfo.split(':');
      //     setUsername(storedUsername);
      //     setPassword(storedPassword);
      //     setRemember(true);
      // } catch (error) {
      //     console.error('Error decoding user info:', error);
      // }
    }
  }, [])

  const publicKey = `MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKoR8mX0rGKLqzcWmOzbfj64K8ZIgOdH
  nzkXSOVOZbFu/TJhZ7rFAN+eaGkl3C4buccQd/EjEsj9ir7ijT7h96MCAwEAAQ==`

  const encrypt = (text: string) => {
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(publicKey)
    return encryptor.encrypt(text)
  }

  const login = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    setErrorMessage('') // 清空错误信息

    try {
      const response = await request.post(
        '/login/systemLogin',
        {
          username: username,
          password: encrypt(password),
          remember: remember,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      setIsSubmitting(false)

      if (response.code === 0) {
        if (remember) {
          const userInfo = btoa(`${username}:${password}`) // 使用btoa编码，替代 $.base64.encode
          Cookies.set('userInfo', userInfo, { expires: 7 }) // 存储7天
        } else {
          Cookies.remove('userInfo')
        }
        const msg = response.msg

        if (msg && msg === '为确保安全，请及时修改密码！') {
          //  处理修改密码的逻辑，可以使用弹窗或者跳转页面
          alert(msg)
        }

        nav('/index')
      } else {
        setErrorMessage(typeof response.msg === 'string' ? response.msg : '未知错误')
      }
    } catch (error) {
      setIsSubmitting(false)
      setErrorMessage('登录失败，请检查网络或稍后重试。')
      console.error('Login error:', error)
    }
  }

  return (
    <LoginPageWrapper>
      <LoginBgWrapper>
        <Logo base={BASE_URL} />
        <ErrorMessage message={errorMessage} setErrorMessage={setErrorMessage} />
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          remember={remember}
          setRemember={setRemember}
          login={login}
          isSubmitting={isSubmitting}
        />
      </LoginBgWrapper>
      <Footer />
    </LoginPageWrapper>
  )
}

export default LoginPage
