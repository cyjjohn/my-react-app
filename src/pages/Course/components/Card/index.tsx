import { ICard, TBaseCard } from '@/types/card.type'
import { EditableProTable } from '@ant-design/pro-components'
import { Drawer } from 'antd'
import _ from 'lodash'
import { memo, useState } from 'react'
import { getColumns } from './constant'
import { useCards, useDelCard, useEditCard } from '@/services/card'

interface IProps {
  id: string
  onClose: () => void
}

const Card = memo(({ id, onClose }: IProps) => {
  const { data, loading, refetch } = useCards(id)
  const [open, setOpen] = useState(true)
  const [edit] = useEditCard()
  const [del] = useDelCard()

  const saveHandler = async (params: TBaseCard) => {
    edit(params.id, id, _.pick(params, ['name', 'validateDay', 'type', 'time']), refetch)
  }

  const deleteHandler = (id: string) => {
    del(id, refetch)
  }

  return (
    <Drawer
      title="管理消费卡"
      open={open}
      afterOpenChange={o => !o && onClose()}
      onClose={() => setOpen(false)}
      width="70vw"
    >
      <EditableProTable<ICard>
        rowKey="id"
        loading={loading}
        columns={getColumns(deleteHandler)}
        value={data}
        recordCreatorProps={{
          //由于每次新增时都需要唯一的key，所以新增一行的时要保证证 recordCreatorProps.record key 唯一
          record: index => ({
            id: _.uniqueId(),
            name: '',
            type: 'time',
            time: 0,
            validateDay: 0,
          }),
        }}
        editable={{
          onSave: async (key, row) => {
            if (data) {
              const index = data.findIndex(item => item.id === key)
              if (index > -1) {
                saveHandler(row)
              } else {
                saveHandler(_.omit(row, ['id']))
              }
            }
          },
          onDelete: async key => {
            deleteHandler(key as string)
          },
        }}
      />
    </Drawer>
  )
})

export default Card
