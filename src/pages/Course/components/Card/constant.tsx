import { ProColumns } from '@ant-design/pro-components'
import { Badge, Popconfirm, Space } from 'antd'

const CARD_TYPE = {
  TIME: 'time',
  DURATION: 'duration',
}

export const getColumns = (deleteHandler: Function): ProColumns[] => [
  {
    title: '序号',
    dataIndex: 'key',
    width: 50,
    editable: false,
    render: (_d, _e, i) => i + 1,
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '卡有效期(天)',
    dataIndex: 'validateDay',
    valueType: 'digit',
    width: 100,
  },
  {
    title: '卡类型',
    dataIndex: 'type',
    width: 120,
    valueType: 'select',
    request: async () => [
      {
        value: CARD_TYPE.TIME,
        label: '次卡',
      },
      {
        value: CARD_TYPE.DURATION,
        label: '时长卡',
      },
    ],
  },
  {
    title: '上课次数',
    dataIndex: 'time',
    valueType: 'digit',
    width: 100,
    render: (text, record) => (
      <Space>
        <Badge status={record.time !== 0 ? 'success' : 'default'} />
        {text}
      </Space>
    ),
  },
  {
    title: '操作',
    valueType: 'option',
    width: 150,
    render: (text, record, _, action) => (
      <Space>
        <a
          key="edit"
          onClick={() => {
            action?.startEditable(record.id || '')
          }}
        >
          编辑
        </a>
        <Popconfirm
          title="提醒"
          description="确认要删除吗？"
          onConfirm={() => deleteHandler(record.id)}
        >
          <a key="delete">删除</a>
        </Popconfirm>
      </Space>
    ),
  },
]
