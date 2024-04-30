import { ICourse } from '@/types/course.type'
import { ProColumns } from '@ant-design/pro-components'
import { Button } from 'antd'

export const getColumns: (
  editHandler: (id: string) => void,
  orderTimeHandler: (id: string) => void,
) => ProColumns<ICourse>[] = (editHandler, orderTimeHandler) => [
  {
    title: '排序',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '课程名称',
    dataIndex: 'name',
  },
  {
    title: '限制人数',
    dataIndex: 'limitNumber',
    search: false,
  },
  {
    title: '持续时长',
    dataIndex: 'duration',
    search: false,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record) => [
      <Button key="edit" type="link" onClick={() => editHandler(record.id)}>
        编辑
      </Button>,
      <Button key="orderTime" type="link" onClick={() => orderTimeHandler(record.id)}>
        可约时间
      </Button>,
    ],
  },
]
