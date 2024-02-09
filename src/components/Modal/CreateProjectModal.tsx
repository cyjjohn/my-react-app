import { Button, Form, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'

interface Values {
  title: string
  description: string
  modifier: string
}

interface CollectionCreateFormProps {
  open: boolean
  onCreate: (values: Values) => void
  onCancel: () => void
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm()
  return (
    <Modal
      open={open}
      title="创建项目"
      okText="创建"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields()
            onCreate(values as Values)
          })
          .catch(info => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form form={form} name="form_in_modal" initialValues={{ modifier: 'public' }}>
        <Form.Item
          name="name"
          label="项目名称"
          rules={[{ required: true, message: '请输入项目名称!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="orgnization"
          label="所在部门"
          rules={[{ required: true, message: '请选择所在部门!' }]}
        >
          <Select />
        </Form.Item>
        <Form.Item
          name="modifier"
          label="负责人"
          rules={[{ required: true, message: '请选择负责人!' }]}
        >
          <Select></Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const CreateProjectModal: React.FC = () => {
  const [open, setOpen] = useState(false)

  const onCreate = (values: unknown) => {
    console.log('Received values of form: ', values)
    setOpen(false)
  }

  return (
    <div>
      <Button
        type="link"
        onClick={() => {
          setOpen(true)
        }}
      >
        New Collection
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </div>
  )
}

export default CreateProjectModal
