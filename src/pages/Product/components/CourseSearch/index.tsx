import { useCoursesForSample } from '@/services/course'
import { Select } from 'antd'
import _ from 'lodash'
import { memo, useEffect, useMemo } from 'react'
import styles from './index.module.less'

interface IProps {
  onSelected: (val: string) => void
}

const CourseSearch = memo(({ onSelected }: IProps) => {
  const { data: courses, loading: getCoursesLoading, search } = useCoursesForSample()

  //初次加载时搜索全部
  useEffect(() => {
    search('')
  }, [])

  const handleSearch = _.debounce((name: string) => {
    search(name)
  }, 500)

  const handleChange = (val: string) => {
    onSelected(val)
  }

  const options = useMemo(
    () =>
      courses?.map(item => ({
        label: item.name,
        value: item.id,
      })),
    [courses],
  )

  return (
    <Select
      placeholder="请搜索课程"
      showSearch
      loading={getCoursesLoading}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      options={options}
      className={styles.select}
    />
  )
})

export default CourseSearch
