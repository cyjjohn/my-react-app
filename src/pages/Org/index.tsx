import { PageContainer, ProList } from '@ant-design/pro-components'
import { useState } from 'react'

import { useDelOrg, useOrganizations } from '@/services/org'
import { DEFAULT_PAGE_SIZE } from '@/utils/constants'
import { Button, Popconfirm, Tag } from 'antd'
import EditOrg from './components/EditOrg'
import style from './index.module.less'

/**
 * 门店列表页面
 */
const Org = () => {
  const [curId, setCurId] = useState('')
  const [showEdit, setShowEdit] = useState(false)
  const { data, page, refetch, loading } = useOrganizations()
  const [del, delLoading] = useDelOrg()

  const editInfoHandler = (id: string) => {
    setCurId(id)
    setShowEdit(true)
  }

  const delInfoHandler = (id: string) => {
    setCurId(id)
    del(id, refetch)
  }

  const datasource = data?.map(item => ({
    ...item,
    key: item.id,
    title: item.name,
    subTitle: (
      <>
        {item.tags?.split(',').map(tag => (
          <Tag key={tag} color="#5BD8A6">
            {tag}
          </Tag>
        ))}
      </>
    ),
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
    actions: [
      <Button type="link" onClick={() => editInfoHandler(item.id)}>
        编辑
      </Button>,
      <Popconfirm
        title="提醒"
        okButtonProps={{
          loading: delLoading,
        }}
        description={`确定要删除 ${item.name} 吗？`}
        onConfirm={() => delInfoHandler(item.id)}
      >
        <Button type="link">删除</Button>
      </Popconfirm>,
    ],
    content: item.address,
  }))

  const addInfoHandler = () => {
    setCurId('')
    setShowEdit(true)
  }

  const onPageChangeHandler = (pageNum: number, pageSize: number) => {
    refetch({
      page: {
        pageNum,
        pageSize,
      },
    })
  }

  const onCloseHandler = () => {
    setCurId('')
    setShowEdit(false)
    refetch()
  }

  return (
    <div className={style.container}>
      <PageContainer
        loading={loading}
        extra={[
          <Button key="1" type="primary" onClick={addInfoHandler}>
            新增门店
          </Button>,
        ]}
      >
        <ProList<any>
          pagination={{
            defaultPageSize: DEFAULT_PAGE_SIZE,
            showSizeChanger: false,
            total: page?.total,
            onChange: onPageChangeHandler,
          }}
          metas={{
            title: {},
            subTitle: {},
            type: {},
            avatar: {},
            content: {},
            actions: {
              cardActionProps: 'extra',
            },
          }}
          grid={{ gutter: 16, column: 2 }}
          dataSource={datasource}
        />
        {showEdit && <EditOrg id={curId} onClose={onCloseHandler} />}
      </PageContainer>
    </div>
  )
}

export default Org
