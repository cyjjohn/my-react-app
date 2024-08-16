import { GET_TEACHERS } from '@/graphql/teacher'
import { TTeachersQuery } from '@/types/teacher.type'
import { DEFAULT_PAGE_SIZE } from '@/utils/constants'
import { useQuery } from '@apollo/client'

export const useTeachers = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
  const { loading, data, refetch } = useQuery<TTeachersQuery>(GET_TEACHERS, {
    variables: {
      page: {
        pageNum,
        pageSize,
      },
    },
  })
  return { loading, refetch, data: data?.getTeachers.data, page: data?.getTeachers.page }
}
