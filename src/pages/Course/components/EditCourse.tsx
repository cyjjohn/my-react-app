import OSSImageUpload from '@/components/OSSImageUpload'
import TeacherSelect from '@/components/TeacherSelect'
import { useCourse, useEditCourseInfo } from '@/services/course'
import { TBaseCourse } from '@/types/course.type'
import {
  ProForm,
  ProFormDigit,
  ProFormField,
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
        //转换antd select组件所需的字段key、value、label
        const value = {
          ...res,
          teachers: res.teachers?.map(item => ({
            key: item.id,
            value: item.id,
            label: item.name,
          })),
        }
        formRef.current?.setFieldsValue(value)
      }
    })()
  }, [id])

  const submit = async () => {
    const values = (await formRef.current?.validateFields()) as TBaseCourse
    if (values) {
      const formData = {
        ...values,
        teachers: values?.teachers?.map(item => ({
          name: item.label,
          id: item.value,
        })),
        coverUrl: values?.coverUrl?.map(item => item.url).join(','),
      } as TBaseCourse
      edit(id, formData, onClose)
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
        <ProFormField label="封面图" name="coverUrl" rules={[{ required: true }]}>
          <OSSImageUpload maxCount={1} label="上传封面" imgCropAspect={2 / 1} />
        </ProFormField>
        <ProFormText label="课程名称" name="name" rules={[{ required: true }]} />
        <ProFormField label="任课老师" name="teachers">
          <TeacherSelect />
        </ProFormField>
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
