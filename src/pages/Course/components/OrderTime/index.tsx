import { IOrderTime } from '@/types/course.type'
import { ChromeOutlined, RedoOutlined } from '@ant-design/icons'
import { EditableProTable } from '@ant-design/pro-components'
import { Button, Col, Drawer, Row, Tabs } from 'antd'
import _ from 'lodash'
import { memo, useState } from 'react'
import { DAYS, IDAY, getColumns, getMaxKey, isWorkDay } from './constant'
import { useOrderTime } from './hooks'
import styles from './index.module.less'

interface IProps {
  id: string
  open: boolean
  onClose: () => void
}

const OrderTime = memo(({ id, open, onClose }: IProps) => {
  const [curDay, setCurDay] = useState<IDAY>(DAYS[0])

  const tabChangeHandler = (key: string) => {
    setCurDay(DAYS.find(item => item.key === key)!)
  }

  const curDayKey = curDay.key

  const { loading, orderTime, saveHandler, deleteHandler, allDaySyncHandler } = useOrderTime(
    id,
    curDayKey,
  )

  return (
    <Drawer
      title="编辑预约时间"
      open={open}
      width={720}
      onClose={onClose}
      extra={<Button onClick={() => onClose()}>取消</Button>}
    >
      <Tabs
        type="card"
        items={DAYS.map(({ key, label }) => {
          return {
            label,
            key,
            children: (
              <div className={styles.title}>
                选择 <span className={styles.name}>{label}</span> 的课开放预约的时间
              </div>
            ),
          }
        })}
        onChange={tabChangeHandler}
      />
      <EditableProTable<IOrderTime>
        rowKey="key"
        loading={loading}
        columns={getColumns(deleteHandler)}
        value={orderTime}
        recordCreatorProps={{
          //由于每次新增时都需要唯一的key，所以新增一行的时要保证证 recordCreatorProps.record key 唯一
          record: () => ({
            key: getMaxKey(orderTime) + 1,
            startTime: '12:00:00',
            endTime: '12:30:00',
          }),
        }}
        editable={{
          onSave: async (key, row) => {
            //检查新增/编辑
            const index = orderTime.findIndex(item => item.key === key)
            if (index > -1) {
              //编辑
              const data = orderTime.map(item => (item.key === key ? _.omit(row, 'index') : item))
              saveHandler(data)
            } else {
              saveHandler([...orderTime, _.omit(row, 'index')])
            }
          },
        }}
      />
      <Row gutter={20} className={styles.buttons}>
        <Col span={12}>
          <Button
            icon={<RedoOutlined />}
            style={{ width: '100%' }}
            type="primary"
            disabled={!isWorkDay(curDay.key)}
            onClick={() => allDaySyncHandler(true)}
          >
            全工作日同步
          </Button>
        </Col>
        <Col span={12}>
          <Button
            icon={<ChromeOutlined />}
            style={{ width: '100%' }}
            type="primary"
            danger
            onClick={() => allDaySyncHandler()}
          >
            全周同步
          </Button>
        </Col>
      </Row>
    </Drawer>
  )
})

export default OrderTime
