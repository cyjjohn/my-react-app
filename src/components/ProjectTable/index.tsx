import { Table, TableProps } from 'antd'
import { FC, memo } from 'react'

interface DataType {
  key: string
  organization: string
  owner: string
  created: string
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '部门',
    dataIndex: 'organization',
    key: 'organization',
    width: '15%',
  },
  {
    title: '负责人',
    dataIndex: 'owner',
    key: 'owner',
    width: '15%',
  },
  {
    title: '创建时间',
    dataIndex: 'created',
    key: 'created',
    width: '15%',
  },
]

const data: DataType[] = [
  {
    key: '测试数据',
    organization: '部门',
    owner: 'cyj',
    created: '2024-01-01',
  },
]

const ProjectTable: FC = memo(() => {
  return <Table columns={columns} dataSource={data} />
})

export default ProjectTable
