import { useTeachers } from '@/services/teacher'
import { IValue } from '@/types/common.type'
import { Select } from 'antd'
import debounce from 'lodash/debounce'
import { memo } from 'react'

interface IProps {
  value?: IValue[]
  onChange?: (val: IValue[]) => void
}

const TeacherSelect = memo(({ value = [], onChange = () => {} }: IProps) => {
  const { data, loading, refetch } = useTeachers(1, 10)

  const options = data?.map(item => ({ key: item.id, value: item.id, label: item.name }))

  const handleSearch = debounce((val: string) => {
    refetch({
      name: val,
    })
  }, 500)

  const changeHandler = (val: IValue[]) => {
    onChange?.(val)
  }

  return (
    <Select
      loading={loading}
      options={options}
      placeholder="请选择老师"
      style={{ width: 200 }}
      showSearch
      onSearch={handleSearch}
      filterOption={false} //远程搜索
      labelInValue
      value={value}
      onChange={changeHandler}
      mode="multiple"
    />
  )
})

export default TeacherSelect
