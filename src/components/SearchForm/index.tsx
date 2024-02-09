import { Button, Form, Input, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { FC, memo } from 'react'

const SearchForm: FC = memo(() => {
  const [form] = useForm()

  return (
    <Form form={form} layout="inline">
      <Form.Item>
        <Input placeholder="任务名" />
      </Form.Item>
      <Form.Item>
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
          ]}
        />
      </Form.Item>
      <Form.Item>
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
          ]}
        />
      </Form.Item>
      <Button>清除筛选器</Button>
    </Form>
  )
})

export default SearchForm
