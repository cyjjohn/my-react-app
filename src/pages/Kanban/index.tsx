import SearchForm from '@/components/SearchForm'
import { Space, Typography } from 'antd'
import { FC, memo } from 'react'
import { KanbanWrapper } from './style'
import DropCard from '@/components/DropCard'

const Kanban: FC = memo(() => {
  return (
    <KanbanWrapper>
      <Space direction="vertical">
        <Typography.Title level={3}>scrum敏捷项目管理研发看板</Typography.Title>
        <SearchForm />
        <DropCard />
      </Space>
    </KanbanWrapper>
  )
})

export default Kanban
