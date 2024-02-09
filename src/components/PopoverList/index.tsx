import { Popover } from 'antd'
import { FC, ReactNode, memo } from 'react'
import { ListWrapper } from './style'

interface PopoverPropsType {
  childNode: ReactNode
  content: ReactNode
}

const PopoverItem = memo((props: PopoverPropsType) => {
  const { childNode, content } = props
  return <Popover content={content}>{childNode}</Popover>
})

const list = [
  {
    childNode: '项目',
    content: '测试',
  },
  {
    childNode: '组员',
    content: '测试',
  },
]

const PopoverList: FC = memo(() => {
  return (
    <ListWrapper>
      {list.map(item => (
        <PopoverItem key={item.childNode} {...item} />
      ))}
    </ListWrapper>
  )
})

export default PopoverList
