import { useUserContext } from '@/hooks/useHooks'
import { routes } from '@/router/menus'
import { AUTH_TOKEN } from '@/utils/constants'
import { MenuDataItem, PageContainer, ProLayout } from '@ant-design/pro-components'
import { Dropdown } from 'antd'
import { FC, memo, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => (
  <Link to={item.path ?? '/'}>{dom}</Link>
)

const MainLayout: FC = memo(() => {
  const { store } = useUserContext()
  const nav = useNavigate()

  useEffect(() => {
    console.log(store)
  }, [store])

  const logout = () => {
    sessionStorage.removeItem(AUTH_TOKEN)
    localStorage.removeItem(AUTH_TOKEN)
    nav('/login')
  }

  return (
    <ProLayout
      title=""
      logo="http://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png"
      layout="mix"
      avatarProps={{
        src: store.avatar || null,
        size: 'small',
        title: store.name || store.tel,
        render: (props, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'logout',
                    label: '退出登录',
                    onClick: logout,
                  },
                ],
              }}
            >
              {dom}
            </Dropdown>
          )
        },
      }}
      siderWidth={150}
      route={{
        path: '/',
        routes,
      }}
      menuItemRender={menuItemRender}
      onMenuHeaderClick={() => nav('/')}
    >
      <PageContainer>
        <Outlet />
      </PageContainer>
    </ProLayout>
  )
})

export default MainLayout
