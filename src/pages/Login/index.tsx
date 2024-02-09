import { Button, Divider, Form, Input } from 'antd'
import { FC, memo } from 'react'
import { LoginWrapper } from './style'
import { Link } from 'react-router-dom'
import Logo from '@/assets/register-logo.svg'

const Login: FC = memo(() => {
  const [form] = Form.useForm()

  return (
    <LoginWrapper>
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="jira" />
        </div>
        <div className="content">
          <Form form={form} className="form">
            <h2>请登录</h2>
            <p>登录界面</p>
            <Form.Item>
              <Input type="text" placeholder="用户名" />
            </Form.Item>
            <Form.Item>
              <Input type="password" placeholder="密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="button">
                登录
              </Button>
            </Form.Item>
            <Divider />
            <Link to={'/register'} className="link">
              没有账号？注册新账号
            </Link>
          </Form>
        </div>
      </div>
    </LoginWrapper>
  )
})

export default Login
