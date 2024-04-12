import OrgSelect from '@/components/OrgSelect'
import { useGoTo, useIsOrgRoute } from '@/hooks/useRoute'
import { useUserContext } from '@/hooks/useStore'
import { ROUTE_KEY } from '@/router'
import { routes } from '@/router/menus'
import { AUTH_TOKEN } from '@/utils/constants'
import { LogoutOutlined, ShopOutlined } from '@ant-design/icons'
import { MenuDataItem, ProLayout } from '@ant-design/pro-components'
import { Dropdown, Space, Tooltip } from 'antd'
import { FC, memo } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => (
  <Link to={item.path ?? '/'}>{dom}</Link>
)

const MainLayout: FC = memo(() => {
  const { store } = useUserContext()
  const { go } = useGoTo()
  const nav = useNavigate()
  const isOrg = useIsOrgRoute()

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
        onClick: () => go(ROUTE_KEY.MY),
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
      links={[
        <Space>
          <LogoutOutlined onClick={logout} />
          退出
        </Space>,
      ]}
      siderWidth={150}
      route={{
        path: '/',
        routes,
      }}
      menuItemRender={menuItemRender}
      onMenuHeaderClick={() => nav('/')}
      actionsRender={() => [
        !isOrg && <OrgSelect />,
        <Tooltip title="门店管理">
          <ShopOutlined
            onClick={() => {
              go(ROUTE_KEY.ORG)
            }}
          />
        </Tooltip>,
      ]}
    >
      <Outlet />
    </ProLayout>
  )
})

export default MainLayout
