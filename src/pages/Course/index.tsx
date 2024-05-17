import { useUserContext } from '@/hooks/useStore'
import { useCourses } from '@/services/course'
import { ICourse } from '@/types/course.type'
import { DEFAULT_PAGE_SIZE } from '@/utils/constants'
import { PlusOutlined } from '@ant-design/icons'
import { ActionType, ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'
import { memo, useEffect, useRef, useState } from 'react'
import Card from './components/Card'
import EditCourse from './components/EditCourse'
import OrderTime from './components/OrderTime'
import { getColumns } from './constant'

const Course = memo(() => {
  const { data, refetch } = useCourses()
  const actionRef = useRef<ActionType>()
  const [curId, setCurId] = useState('')
  const [showEdit, setShowEdit] = useState(false)
  const [showOrderTime, setShowOrderTime] = useState(false)
  const [showCard, setShowCard] = useState(false)
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

  const closeAndRefetchHandler = (isReload?: boolean) => {
    setShowEdit(false)
    //若有提交后台则刷新
    if (isReload) {
      actionRef.current?.reload()
    }
  }

  const orderTimeHandler = (id: string) => {
    setCurId(id)
    setShowOrderTime(true)
  }

  const cardHandler = (id: string) => {
    setCurId(id)
    setShowCard(true)
  }

  return (
    <>
      <ProTable<ICourse>
        rowKey="id"
        actionRef={actionRef}
        columns={getColumns(addHandler, orderTimeHandler, cardHandler)}
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
      {showEdit && <EditCourse id={curId} onClose={closeAndRefetchHandler} />}
      {showOrderTime && <OrderTime id={curId} onClose={() => setShowOrderTime(false)} />}
      {showCard && <Card id={curId} onClose={() => setShowCard(false)} />}
    </>
  )
})

export default Course
