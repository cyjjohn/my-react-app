import OSSImageUpload from '@/components/OSSImageUpload'
import { UPDATE_USER } from '@/graphql/user'
import { useUserContext } from '@/hooks/useHooks'
import { ProForm, ProFormInstance, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { useMutation } from '@apollo/client'
import { App, Col, Form, Row } from 'antd'
import { memo, useEffect, useRef } from 'react'

const My = memo(() => {
  const { message } = App.useApp()
  const formRef = useRef<ProFormInstance>()
  const { store } = useUserContext()
  const [updateUser] = useMutation(UPDATE_USER)

  useEffect(() => {
    if (!store.tel) return
    console.log(formRef.current?.getFieldsFormatValue())
    formRef.current?.setFieldsValue({
      tel: store.tel,
      name: store.name,
      desc: store.desc,
      avatar: [
        {
          url: store.avatar,
        },
      ],
    })
  }, [store])

  return (
    <ProForm
      formRef={formRef}
      layout="horizontal"
      onFinish={async values => {
        const res = await updateUser({
          variables: {
            id: store.id,
            params: {
              name: values.name,
              desc: values.desc,
              avatar: values.avatar[0].url,
            },
          },
        })
        const { code, message: msg } = res.data.updateUserInfo
        if (code === 200) {
          store.refetch()
          message.success(msg)
        } else {
          message.error(msg)
        }
      }}
      submitter={{
        resetButtonProps: {
          style: {
            display: 'none',
          },
        },
      }}
    >
      <Row gutter={20}>
        <Col>
          <ProFormText name="tel" label="手机号" tooltip="不能修改" disabled />
          <ProFormText name="name" label="昵称" placeholder="请输入昵称" />
          <ProFormTextArea name="desc" label="简介" placeholder="请输入简介信息" />
        </Col>
        <Col>
          <Form.Item
            name="avatar"
            valuePropName="fileList"
            // getValueFromEvent={e => {
            //   if (Array.isArray(e)) return e
            //   return e?.fileList
            // }}
          >
            <OSSImageUpload label="替换头像" />
          </Form.Item>
        </Col>
      </Row>
    </ProForm>
  )
})

export default My
