import { GET_PRODUCT_TYPES } from '@/graphql/product'
import { TProductTypesQuery } from '@/types/product.type'
import { ProFormSelect } from '@ant-design/pro-components'
import { useQuery } from '@apollo/client'
import { Spin, Select } from 'antd'
import { memo } from 'react'

interface IProps {
  onChange: (key: string) => void
}

const TypeSelect = memo(() => {
  const { data, loading } = useQuery<TProductTypesQuery>(GET_PRODUCT_TYPES)
  const types = data?.getProductTypes?.data ?? []
  if (loading || types?.length === 0) return <Spin />

  return (
    <ProFormSelect
      label="商品类型"
      name="type"
      colProps={{ span: 5, offset: 1 }}
      rules={[{ required: true }]}
      valuePropName="value"
      initialValue={types[0]?.key}
      options={types.map(item => ({
        value: item.key,
        label: item.title,
      }))}
    />
  )
})

export default TypeSelect
