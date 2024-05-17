import { useCourse, useEditCourseInfo } from '@/services/course'
import { TBaseCourse } from '@/types/course.type'
import {
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components'
import { Button, Drawer, Space } from 'antd'
import { memo, useEffect, useRef, useState } from 'react'

interface IProps {
  id?: string
  onClose: (isReload?: boolean) => void
}

/**
 * 创建/编辑课程信息
 */
const EditCourse = memo(({ id, onClose }: IProps) => {
  const [open, setOpen] = useState(true)
  const formRef = useRef<ProFormInstance>()
  const { getCourse, loading } = useCourse()
  const [edit, editLoading] = useEditCourseInfo()

  //获取一次课程信息
  useEffect(() => {
    ;(async () => {
      if (id) {
        const res = await getCourse(id)
        formRef.current?.setFieldsValue(res)
      }
    })()
  }, [id])

  const submit = async () => {
    const values = (await formRef.current?.validateFields()) as TBaseCourse
    if (values) {
      edit(id, values, onClose)
    }
  }

  return (
    <Drawer
      title={id ? '编辑课程信息' : '新建课程'}
      width="720px"
      open={open}
      extra={
        <Space>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button type="primary" onClick={submit} loading={editLoading}>
            提交
          </Button>
        </Space>
      }
      onClose={() => setOpen(false)}
      afterOpenChange={o => !o && onClose()}
    >
      <ProForm
        layout="horizontal"
        grid={true}
        formRef={formRef}
        submitter={{
          submitButtonProps: { style: { display: 'none' } },
          resetButtonProps: { style: { display: 'none' } },
        }}
        loading={loading}
      >
        <ProFormText label="课程名称" name="name" rules={[{ required: true }]} />
        <ProFormText label="课程描述" name="desc" rules={[{ required: true }]} />
        <ProForm.Group direction="vertical" rowProps={{ gutter: 20 }}>
          <ProFormDigit
            label="限制人数"
            name="limitNumber"
            rules={[{ required: true }]}
            fieldProps={{ addonAfter: '人' }}
            colProps={{ span: 10 }}
          />
          <ProFormDigit
            label="持续时长"
            name="duration"
            rules={[{ required: true }]}
            fieldProps={{ addonAfter: '分钟' }}
            colProps={{ span: 10 }}
          />
        </ProForm.Group>
        <ProFormText label="适龄人群" name="group" rules={[{ required: true }]} />
        <ProFormText label="基础能力" name="baseAbility" rules={[{ required: true }]} />
        <ProFormTextArea
          label="预约信息"
          name="reserveInfo"
          rules={[{ required: true }]}
          fieldProps={{ showCount: true, maxLength: 200, rows: 5 }}
        />
        <ProFormTextArea
          label="退款信息"
          name="refundInfo"
          rules={[{ required: true }]}
          fieldProps={{ showCount: true, maxLength: 200, rows: 5 }}
        />
        <ProFormTextArea
          label="其他信息"
          name="otherInfo"
          fieldProps={{ showCount: true, maxLength: 200, rows: 5 }}
        />
      </ProForm>
    </Drawer>
  )
})

export default EditCourse
