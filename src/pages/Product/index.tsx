import { useUserContext } from '@/hooks/useStore'
import { useDelProduct, useProducts } from '@/services/product'
import { IProduct } from '@/types/product.type'
import { DEFAULT_PAGE_SIZE } from '@/utils/constants'
import { PlusOutlined } from '@ant-design/icons'
import { ActionType, ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'
import { memo, useEffect, useRef, useState } from 'react'
import EditProduct from './components/EditProduct'
import { getColumns } from './constant'
import styles from './index.module.less'
import ConsumeCard from './components/ConsumeCard'

const Product = memo(() => {
  const [curId, setCurId] = useState('')
  const [showEdit, setShowEdit] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const actionRef = useRef<ActionType>()
  const { data, refetch, loading } = useProducts()
  const [del, delLoading] = useDelProduct()
  const { store } = useUserContext()

  useEffect(() => {
    actionRef.current?.reload()
  }, [store.currentOrg])

  const addHandler = (id?: string) => {
    if (id) {
      setCurId(id)
    } else {
      setCurId('')
    }
    setShowEdit(true)
  }

  const closeHandler = (isReload?: boolean) => {
    setCurId('')
    setShowEdit(false)
    if (isReload) {
      actionRef.current?.reload()
    }
  }

  const editHandler = (id: string) => {
    setCurId(id)
    setShowEdit(true)
  }

  const delHandler = (id: string) => {
    setCurId(id)
    del(id, () => {
      actionRef.current?.reload()
    })
  }

  const cardHandler = (id: string) => {
    setCurId(id)
    setShowCard(true)
  }

  return (
    <>
      <h2>当前门店下开设的课程</h2>
      <ProTable<IProduct>
        rowKey="id"
        form={{
          ignoreRules: false,
        }}
        scroll={{ x: 'max-content' }}
        loading={loading}
        actionRef={actionRef}
        columns={getColumns({
          editHandler,
          delHandler,
          cardHandler,
        })}
        dataSource={data}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        request={refetch}
        toolBarRender={() => [
          <Button key="add" onClick={() => addHandler()} type="primary" icon={<PlusOutlined />}>
            新建
          </Button>,
        ]}
      />
      {showEdit && <EditProduct id={curId} onClose={closeHandler} />}
      {showCard && <ConsumeCard id={curId} onClose={() => setShowCard(false)} />}
    </>
  )
})

export default Product
