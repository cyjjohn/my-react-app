import { useLazyCards } from '@/services/card'
import { useEditProduct, useProductInfo } from '@/services/product'
import { getCardName } from '@/utils/constants'
import { CreditCardOutlined } from '@ant-design/icons'
import { CheckCard } from '@ant-design/pro-components'
import { Modal, Result, Space, Typography } from 'antd'
import _ from 'lodash'
import { memo, useEffect, useMemo, useState } from 'react'
import CourseSearch from '../CourseSearch'
import styles from './index.module.less'
import { ICard } from '@/types/card.type'

interface IProps {
  id: string
  onClose: () => void
}

const ConsumeCard = memo(({ id, onClose }: IProps) => {
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const [tmpCards, setTmpCards] = useState<ICard[]>([]) //临时存放已勾选卡片
  const [open, setOpen] = useState(true)
  const { data: product, loading: getProductLoading, refetch: getProductInfo } = useProductInfo(id)
  const { getCards, data: cards, loading: getCardsLoading } = useLazyCards()
  const [edit, editLoading] = useEditProduct()

  const newCards = useMemo(
    () => _.unionBy(tmpCards, product?.cards, cards, 'id'),
    [cards, product?.cards, tmpCards],
  )

  useEffect(() => {
    setSelectedCards(product?.cards?.map(item => item.id) ?? [])
  }, [product?.cards])

  const onOk = () => {
    const params = {}
    edit(
      id,
      {
        cards: selectedCards,
      },
      () => {
        onClose()
        getProductInfo() //修改后刷新内容 不知道为什么useQuery直接设置skip:false不生效
      },
    )
  }

  const selectHandler = (courseId: string) => {
    const tmp = newCards.filter(item => selectedCards.includes(item.id))
    setTmpCards(tmp)
    getCards(courseId)
  }

  return (
    <Modal
      title="绑定消费卡"
      width={900}
      open={open}
      confirmLoading={editLoading}
      onCancel={() => setOpen(false)}
      afterOpenChange={o => !o && onClose()}
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
                value={item.id}
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
