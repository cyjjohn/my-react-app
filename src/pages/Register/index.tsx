import { Button, Divider, Form, Input } from 'antd'
import { FC, memo } from 'react'
import { RegisterWrapper } from './style'
import { Link } from 'react-router-dom'
import Logo from '@/assets/register-logo.svg'

const Register: FC = memo(() => {
  const [form] = Form.useForm()

  const onFinish = (values: unknown) => {
    console.log(values)
  }

  return (
    <RegisterWrapper>
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="jira" />
        </div>
        <div className="content">
          <Form form={form} className="form" onFinish={onFinish}>
            <h2>请注册</h2>
            <p>注册界面</p>
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
              <Input type="text" placeholder="用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
              <Input type="password" placeholder="密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="button">
                注册
              </Button>
            </Form.Item>
            <Divider />
            <Link to={'/login'} className="link">
              已有账号？登录账号
            </Link>
          </Form>
        </div>
      </div>
    </RegisterWrapper>
  )
})

export default Register
