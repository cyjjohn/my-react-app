import OSSImageUpload from '@/components/OSSImageUpload'
import { useEditProduct, useProduct } from '@/services/product'
import { IProduct, TBaseProduct } from '@/types/product.type'
import {
  ProForm,
  ProFormDigit,
  ProFormField,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components'
import { Button, Drawer } from 'antd'
import { memo, useEffect, useRef, useState } from 'react'
import TypeSelect from '../TypeSelect'

interface IProp {
  id: string
  onClose: (isReload?: boolean) => void
}

const EditProduct = memo(({ id, onClose }: IProp) => {
  const formRef = useRef<ProFormInstance>()
  const { getProduct, loading } = useProduct()
  const [commit, editLoading] = useEditProduct()
  const [open, setOpen] = useState(true)

  useEffect(() => {
    ;(async () => {
      if (id) {
        const data = await getProduct(id)
        formRef.current?.setFieldsValue({
          ...data,
          //图片数据处理
          coverUrl: [{ url: data.coverUrl }],
          bannerUrl: [{ url: data.bannerUrl }],
        })
      }
    })()
  }, [id])

  const onFinishHandler = async () => {
    const values = (await formRef.current?.validateFields()) as TBaseProduct
    console.log(values)
    if (values) {
      const formData = {
        ...values,
        coverUrl: values?.coverUrl.map(item => item.url).join(','),
        bannerUrl: values?.bannerUrl?.map(item => item.url).join(','),
      } as IProduct
      commit(id, formData, onClose)
    }
  }

  return (
    <Drawer
      title={`${!id ? '新建' : '编辑'}产品信息`}
      width="70vw"
      open={open}
      onClose={() => setOpen(false)}
      afterOpenChange={o => !o && onClose()}
      styles={{
        footer: { textAlign: 'right' },
      }}
      footer={
        <Button loading={editLoading} type="primary" onClick={onFinishHandler}>
          保存
        </Button>
      }
    >
      <ProForm
        grid={true}
        rowProps={{
          gutter: 20,
        }}
        formRef={formRef}
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
        loading={loading}
      >
        <ProForm.Group>
          <ProFormText
            label="名称"
            name="name"
            colProps={{ span: 10 }}
            rules={[{ required: true }]}
          />
          <TypeSelect />
          <ProFormDigit
            label="库存总额"
            name="stock"
            colProps={{ span: 6, offset: 1 }}
            rules={[{ required: true }]}
            fieldProps={{ precision: 0 }}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormDigit
            label="原价"
            name="originalPrice"
            colProps={{ span: 6 }}
            rules={[{ required: true }]}
          />
          <ProFormDigit
            label="优惠价"
            name="preferentialPrice"
            colProps={{ span: 6, offset: 2 }}
            rules={[{ required: true }]}
          />
          <ProFormDigit
            label="每人限购数量"
            name="limitBuyNumber"
            colProps={{ span: 6, offset: 2 }}
            rules={[{ required: true }]}
            fieldProps={{ precision: 0 }}
          />
        </ProForm.Group>
        <ProFormTextArea label="商品简介" name="desc" rules={[{ required: true }]} allowClear />
        <ProForm.Group>
          <ProFormField
            label="商品封面图 图片长宽要求比例16:9"
            name="coverUrl"
            colProps={{ span: 10 }}
            rules={[{ required: true }]}
          >
            <OSSImageUpload label="上传图片" imgCropAspect={16 / 9} />
          </ProFormField>
          <ProFormField
            label="banner图 图片长宽要求比例16:9"
            name="bannerUrl"
            colProps={{ span: 10 }}
            rules={[{ required: true }]}
          >
            <OSSImageUpload label="上传图片" imgCropAspect={16 / 9} />
          </ProFormField>
        </ProForm.Group>
      </ProForm>
    </Drawer>
  )
})

export default EditProduct
