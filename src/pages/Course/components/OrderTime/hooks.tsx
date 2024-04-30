import { useCourseInfo, useEditCourseInfo } from '@/services/course'
import { IOrderTime, IWeekCourse, TWeek } from '@/types/course.type'
import { useMemo } from 'react'
import { DAYS, isWorkDay } from './constant'

export const useOrderTime = (id: string, curDayKey: TWeek) => {
  const { data, loading, refetch } = useCourseInfo(id)
  const [edit, editLoading] = useEditCourseInfo()

  const orderTime = useMemo(
    () => data?.reducibleTime?.find(item => item.week === curDayKey)?.orderTime ?? [],
    [data, curDayKey],
  )

  const saveHandler = (orderTime: IOrderTime[]) => {
    const copyData = [...(data?.reducibleTime ?? [])]
    const index = copyData.findIndex(item => item?.week == curDayKey)
    const newOrderTime = {
      week: curDayKey,
      orderTime,
    }
    if (index > -1) {
      copyData[index] = newOrderTime
    } else {
      copyData.push(newOrderTime)
    }
    edit(
      id,
      {
        reducibleTime: copyData,
      },
      () => refetch(),
    )
  }

  const deleteHandler = (key: number) => {
    const newData = orderTime.filter(item => item.key !== key)
    saveHandler(newData)
  }

  const allDaySyncHandler = (onlyWorkDay = false) => {
    const data = [] as IWeekCourse[]
    for (const day of DAYS) {
      if (!onlyWorkDay || isWorkDay(day.key)) {
        data.push({
          week: day.key,
          orderTime: orderTime,
        })
      }
    }
    edit(
      id,
      {
        reducibleTime: data,
      },
      () => refetch(),
    )
  }

  return {
    loading: loading || editLoading,
    orderTime,
    saveHandler,
    deleteHandler,
    allDaySyncHandler,
  }
}
