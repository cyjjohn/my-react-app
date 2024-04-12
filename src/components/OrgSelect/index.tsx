import { useOrganizations } from '@/services/org'
import { LOCAL_CURRENT_ORG } from '@/utils/constants'
import { Select, Space } from 'antd'
import { memo, useEffect } from 'react'
import debounce from 'lodash/debounce'
import { useUserContext } from '@/hooks/useStore'

const curOrg = () => {
  let res
  try {
    res = JSON.parse(localStorage.getItem(LOCAL_CURRENT_ORG) ?? '')
  } catch {
    res = { label: '', value: '' }
  }
  return res
}

const OrgSelect = memo(() => {
  const { data, loading, refetch } = useOrganizations(1, 10, true)
  const { setStore } = useUserContext()

  useEffect(() => {
    if (curOrg().value) {
      setStore({
        currentOrg: curOrg().value,
      })
    }
  }, [])

  const options = data?.map(item => ({ key: item.id, value: item.id, label: item.name }))

  const handleSearch = debounce((val: string) => {
    refetch({
      name: val,
    })
  }, 500)

  const handleChange = (val: { value: string; label: string }) => {
    setStore({
      currentOrg: val,
    })
    localStorage.setItem(LOCAL_CURRENT_ORG, JSON.stringify(val))
  }

  return (
    <Space style={{ padding: '0 6px' }}>
      选择门店:
      <Select
        loading={loading}
        options={options}
        placeholder="请选择门店"
        style={{ width: 200 }}
        defaultValue={curOrg()}
        showSearch
        onSearch={handleSearch}
        filterOption={false} //远程搜索
        labelInValue
        onChange={handleChange}
      />
    </Space>
  )
})

export default OrgSelect
