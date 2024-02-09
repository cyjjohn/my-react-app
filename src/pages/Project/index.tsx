import { FC, memo } from 'react'
import { ProjectWrapper } from './style'
import ProjectTable from '@/components/ProjectTable'
import Typography from 'antd/es/typography/Typography'
import { Input, Select, Space } from 'antd'

const { Title } = Typography

const Project: FC = memo(() => {
  return (
    <ProjectWrapper>
      <Title level={3}>项目列表</Title>
      <Space className="search">
        <Input placeholder="任务名" />
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />
      </Space>
      <ProjectTable />
    </ProjectWrapper>
  )
})

export default Project
