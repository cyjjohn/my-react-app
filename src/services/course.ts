import { COMMIT_COURSE, GET_COURSE, GET_COURSES } from '@/graphql/course'
import { ICourse, TBaseCourse, TCourseQuery, TCoursesQuery } from '@/types/course.type'
import { DEFAULT_PAGE_SIZE } from '@/utils/constants'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { App } from 'antd'

export const useCourses = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
  const { loading, data, refetch } = useQuery<TCoursesQuery>(GET_COURSES, {
    skip: true,
    variables: {
      page: {
        pageNum,
        pageSize,
      },
    },
  })

  const refetchHandler = async (params: { name?: string; pageSize?: number; current?: number }) => {
    const { data, errors } = await refetch({
      // 这里的参数格式是antd的规范
      name: params.name,
      page: {
        pageNum: params.current ?? 1,
        pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE,
      },
    })
    if (errors) {
      return {
        sucesss: false,
      }
    }
    return { data: data?.getCourses.data, page: data?.getCourses.page, sucesss: true }
  }

  return {
    loading,
    refetch: refetchHandler,
    data: data?.getCourses.data,
    page: data?.getCourses.page,
  }
}

export const useCourse = () => {
  const [get, { loading }] = useLazyQuery(GET_COURSE)

  const getCourse = async (id: string): Promise<ICourse> => {
    const res = await get({
      variables: {
        id,
      },
    })
    return res.data.getCourseInfo.data as ICourse
  }

  return {
    loading,
    getCourse,
  }
}

export const useCourseInfo = (id: string) => {
  const { data, loading, refetch } = useQuery<TCourseQuery>(GET_COURSE, {
    variables: {
      id,
    },
  })

  return { data: data?.getCourseInfo.data, loading, refetch }
}

export const useEditCourseInfo = (): [handleEdit: Function, loading: boolean] => {
  const { message } = App.useApp()
  const [edit, { loading }] = useMutation(COMMIT_COURSE)

  const handleEdit = async (
    id: number,
    params: TBaseCourse,
    callback: (isReload: boolean) => void,
  ) => {
    const res = await edit({
      variables: {
        id,
        params,
      },
    })
    if (res.data.commitCourseInfo.code === 200) {
      message.success(res.data.commitCourseInfo.message)
      callback(true)
      return
    }
    message.error(res.data.commitCourseInfo.message)
  }

  return [handleEdit, loading]
}
