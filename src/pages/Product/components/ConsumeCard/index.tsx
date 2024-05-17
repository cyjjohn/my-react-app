import { useEditCard, useLazyCards } from '@/services/card'
import { useProductInfo } from '@/services/product'
import { getCardName } from '@/utils/constants'
import { CreditCardOutlined } from '@ant-design/icons'
import { CheckCard } from '@ant-design/pro-components'
import { Modal, Result, Row, Space, Typography } from 'antd'
import _ from 'lodash'
import { memo, useMemo, useState } from 'react'
import CourseSearch from '../CourseSearch'
import styles from './index.module.less'

interface IProps {
  id: string
  courseId: string
  onClose: () => void
}

const ConsumeCard = memo(({ id, courseId, onClose }: IProps) => {
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const { data: product, loading: getProductLoading } = useProductInfo(id)
  const { getCards, data: cards, loading: getCardsLoading } = useLazyCards()
  const [edit, editLoading] = useEditCard()

  const newCards = useMemo(() => _.unionBy(product?.cards, cards, 'id'), [cards, product?.cards])

  const onOk = () => {
    const params = {}
    edit(id, {
      cards: selectedCards,
    })
  }

  const selectHandler = (courseId: string) => {
    getCards(courseId)
  }

  return (
    <Modal
      title="绑定消费卡"
      width={900}
      open
      confirmLoading={editLoading}
      onCancel={() => onClose()}
      onOk={onOk}
    >
      <div className={styles['select-container']}>
        <CourseSearch onSelected={selectHandler} />
      </div>
      <div className={styles['card-container']}>
        {newCards.length === 0 ? (
          <Result status="warning">请搜索课程并选择对应的消费卡</Result>
        ) : (
          <CheckCard.Group
            multiple
            onChange={value => {
              setSelectedCards(value as string[])
            }}
            loading={getCardsLoading || getProductLoading}
            value={selectedCards}
          >
            {newCards?.map(item => (
              <CheckCard
                className={styles.card}
                key={item.id}
                size="small"
                avatar={<CreditCardOutlined />}
                title={
                  <Space direction="vertical">
                    <Space>
                      <Typography.Text ellipsis className={styles.name}>
                        {item.course?.name}
                      </Typography.Text>
                      {getCardName(item.type)}
                    </Space>
                    <b>{item.name}</b>
                  </Space>
                }
                value={item.type}
                description={
                  <Space>
                    <span>次数:{item.time}</span>
                    <span>有效期:{item.validateDay}天</span>
                  </Space>
                }
              />
            ))}
          </CheckCard.Group>
        )}
      </div>
    </Modal>
  )
})

export default ConsumeCard
