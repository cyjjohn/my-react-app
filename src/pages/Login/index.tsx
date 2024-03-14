import { LOGIN, SEND_CODE_MSG } from '@/graphql/auth'
import { AUTH_TOKEN } from '@/utils/constants'
import { LockOutlined, MobileOutlined, WechatOutlined } from '@ant-design/icons'
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components'
import { useMutation } from '@apollo/client'
import { Divider, Space, Tabs, message, theme } from 'antd'
import { useState } from 'react'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'

type LoginType = 'phone' | 'account'
interface LoginValues {
  tel: string
  code: string
  autoLogin: boolean
}
const Actions = () => {
  const { token } = theme.useToken()
  return (
    <div className={styles.actions}>
      <Divider plain>
        <span
          style={{
            color: token.colorTextPlaceholder,
            fontWeight: 'normal',
            fontSize: 14,
          }}
        >
          其他登录方式
        </span>
      </Divider>
      <Space align="center" size={24}>
        <div>
          <WechatOutlined className={styles.wechat} />
        </div>
      </Space>
    </div>
  )
}

export const Login = () => {
  const [sendMsg] = useMutation(SEND_CODE_MSG)
  const [login] = useMutation(LOGIN)
  const [loginType, setLoginType] = useState<LoginType>('phone')
  const { token } = theme.useToken()
  const nav = useNavigate()

  const loginHandler = async (values: LoginValues) => {
    const res = await login({
      variables: values,
    })
    const { code, message, data } = res.data.login
    console.log(code)
    if (code === 200) {
      if (values.autoLogin) {
        localStorage.setItem(AUTH_TOKEN, data)
      }
      message.success(message)
      nav('/')
    } else {
      await message.error(message)
    }
  }
  return (
    <div className={styles.container}>
      <LoginFormPage
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.pnghttps://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo="http://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png"
        actions={<Actions />}
        onFinish={loginHandler}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={activeKey => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
        </Tabs>
        {
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: (
                  <MobileOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              name="tel"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`
                }
                return '获取验证码'
              }}
              phoneName="tel"
              name="code"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async (phone: string) => {
                try {
                  const res = await sendMsg({
                    variables: {
                      tel: phone,
                    },
                  })
                  if (res.data?.sendCodeMsg.code === 200) {
                    await message.success(res.data?.sendCodeMsg.message)
                  } else {
                    await message.error(res.data?.sendCodeMsg.message)
                  }
                } catch (error) {
                  await message.error(error)
                }
              }}
            />
          </>
        }
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginFormPage>
    </div>
  )
}

export default Login
