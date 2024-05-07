import { COMMIT_CARD, DEL_CARD, GET_CARDS } from '@/graphql/card'
import { TBaseCard, TCardsQuery } from '@/types/card.type'
import { useMutation, useQuery } from '@apollo/client'
import { App, message } from 'antd'

export const useCards = (courseId: string, name?: string) => {
  const { loading, data, refetch } = useQuery<TCardsQuery>(GET_CARDS, {
    variables: {
      courseId,
      name,
    },
  })
  return {
    loading,
    data: data?.getCards.data,
    refetch,
  }
}

export const useEditCard = () => {
  const { message } = App.useApp()
  const [edit, { loading }] = useMutation(COMMIT_CARD)

  const handleEdit = async (
    id: string,
    courseId: string,
    params: TBaseCard,
    callback: () => void,
  ) => {
    const res = await edit({
      variables: {
        id,
        courseId,
        params,
      },
    })
    if (res.data.commitCardInfo.code === 200) {
      message.success(res.data.commitCardInfo.message)
      callback()
      return
    }
    message.error(res.data.commitCardInfo.message)
  }

  return [handleEdit, loading]
}

export const useDelCard = () => {
  const [del, loading] = useMutation(DEL_CARD)

  const delHandler = async (id: string, callback: () => void) => {
    const res = await del({
      variables: {
        id,
      },
    })
    if (res.data.deleteCard.code === 200) {
      message.success(res.data.deleteCard.message)
      callback()
      return
    }
    message.error(res.data.deleteCard.message)
  }

  return [delHandler, loading]
}
