import OSSImageUpload from '@/components/OSSImageUpload'
import MapComponent from '@/pages/Course/components/Map'
import { useEditOrg, useOrganization } from '@/services/org'
import { IOrganization, TBaseOrganization } from '@/types/org.type'
import {
  ProForm,
  ProFormField,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components'
import { Button, Divider, Drawer, Form } from 'antd'
import { memo, useMemo, useState } from 'react'

interface IProp {
  id: string
  onClose: () => void
}

const EditOrg = memo(({ id, onClose }: IProp) => {
  const [open, setOpen] = useState(true)
  const [form] = Form.useForm()
  const { data, loading } = useOrganization(id)
  const [commit, editLoading] = useEditOrg()

  const onFinishHandler = async () => {
    const values = (await form.validateFields()) as TBaseOrganization
    if (values) {
      const formData = {
        ...values,
        logo: values.logo[0].url,
        tags: values.tags.join(','),
        identityCardBackImg: values.identityCardBackImg[0].url,
        identityCardFrontImg: values.identityCardFrontImg[0].url,
        businessLicense: values.businessLicense[0].url,
        longitude: values.longitude?.toString(),
        latitude: values.latitude?.toString(),
        orgFrontImg: values?.orgFrontImg?.map(item => ({ url: item.url })),
        orgRoomImg: values?.orgRoomImg?.map(item => ({ url: item.url })),
        orgOtherImg: values?.orgOtherImg?.map(item => ({ url: item.url })),
      } as IOrganization
      commit(formData, id)
    }
  }

  const initialValues = useMemo(
    () =>
      data
        ? {
            ...data,
            tags: data.tags?.split(','),
            logo: [{ url: data.logo }],
            identityCardBackImg: [{ url: data.identityCardBackImg }],
            identityCardFrontImg: [{ url: data.identityCardFrontImg }],
            businessLicense: [{ url: data.businessLicense }],
          }
        : undefined,
    [data],
  )

  return (
    <Drawer
      title="编辑门店信息"
      width="70vw"
      onClose={() => setOpen(false)}
      afterOpenChange={o => !o && onClose()}
      open={open}
      styles={{
        footer: { textAlign: 'right' },
      }}
      footer={
        <Button loading={editLoading} type="primary" onClick={onFinishHandler}>
          保存
        </Button>
      }
    >
      {initialValues ? (
        <ProForm
          grid={true}
          rowProps={{
            gutter: 20,
          }}
          form={form}
          submitter={{
            resetButtonProps: {
              style: {
                // 隐藏重置按钮
                display: 'none',
              },
            },
            submitButtonProps: {
              style: {
                display: 'none',
              },
            },
          }}
          initialValues={initialValues}
          loading={loading}
        >
          <ProForm.Group>
            <ProFormField
              label="Logo"
              name="logo"
              colProps={{ span: 10 }}
              rules={[{ required: true }]}
            >
              <OSSImageUpload label="替换图片" />
            </ProFormField>
            <ProFormText
              label="名称"
              name="name"
              colProps={{ span: 10 }}
              rules={[{ required: true }]}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              label="标签"
              name="tags"
              mode="tags"
              colProps={{ span: 11 }}
              rules={[{ required: true }]}
              placeholder="请输入标签"
            />
            <ProFormText
              label="手机号"
              name="tel"
              colProps={{ span: 5 }}
              rules={[{ required: true }]}
              placeholder="请输入手机号"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormField label="地图选点" name="map">
              <MapComponent form={form} />
            </ProFormField>
            <ProFormText
              label="地址"
              name="address"
              colProps={{ xl: 8, md: 12 }}
              rules={[{ required: true }]}
            />
            <ProFormText
              label="经度"
              name="longitude"
              colProps={{ span: 4 }}
              rules={[{ required: true }]}
              placeholder="请输入经度"
            />
            <ProFormText
              label="纬度"
              name="latitude"
              colProps={{ span: 4 }}
              rules={[{ required: true }]}
              placeholder="请输入纬度"
            />
          </ProForm.Group>
          <ProFormTextArea
            label="门店简介"
            name="description"
            rules={[{ required: true }]}
            allowClear
          />
          <ProForm.Group>
            <ProFormField
              label="营业执照"
              name="businessLicense"
              colProps={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <OSSImageUpload label="替换营业执照" />
            </ProFormField>
            <ProFormField
              label="身份证正面"
              name="identityCardFrontImg"
              colProps={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <OSSImageUpload label="替换身份证" />
            </ProFormField>
            <ProFormField
              label="身份证背面"
              name="identityCardBackImg"
              colProps={{ span: 8 }}
              rules={[{ required: true }]}
            >
              <OSSImageUpload label="替换身份证" />
            </ProFormField>
          </ProForm.Group>

          <Divider>门店顶部图：图片长宽要求比例为 2:1,最多上传 5 张 </Divider>
          <ProFormField name="orgFrontImg">
            <OSSImageUpload maxCount={5} imgCropAspect={2 / 1} />
          </ProFormField>
          <Divider>门店室内图 2:1,最多上传 5 张 </Divider>
          <ProFormField name="orgRoomImg">
            <OSSImageUpload maxCount={5} imgCropAspect={2 / 1} />
          </ProFormField>
          <Divider>门店其他图：图片长宽要求比例为 2:1,最多上传 5 张 </Divider>
          <ProFormField name="orgOtherImg">
            <OSSImageUpload maxCount={5} imgCropAspect={2 / 1} />
          </ProFormField>
        </ProForm>
      ) : null}
    </Drawer>
  )
})

export default EditOrg
