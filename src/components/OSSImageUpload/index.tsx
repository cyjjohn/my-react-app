import { GET_OSS_INFO } from '@/graphql/oss'
import { IOSSDataType } from '@/types/oss.type'
import { useQuery } from '@/utils/apollo'
import { PlusOutlined } from '@ant-design/icons'
import { Space, Upload, UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'

interface AliyunOSSUploadProps {
  label?: string
  value?: UploadFile[]
  onChange?: (file: UploadFile[]) => void
}

/**
 * 图片上传
 */
const OSSImageUpload = ({ label, value, onChange }: AliyunOSSUploadProps) => {
  const { data, refetch } = useQuery<{ getOSSInfo: IOSSDataType }>(GET_OSS_INFO)
  const OSSData = data?.getOSSInfo
  console.log(value)
  const getKey = (file: UploadFile) => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'))
    const key = `${OSSData?.dir}${file.uid}${suffix}`
    const url = `${OSSData?.host}/${key}`
    return { key, url }
  }

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    const files = fileList.map(f => ({
      ...f,
      url: f.url ?? getKey(f).url,
    }))
    onChange?.(files)
  }

  const getExtraData: UploadProps['data'] = file => ({
    key: getKey(file).key,
    OSSAccessKeyId: OSSData?.accessId,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
  })

  const beforeUpload: UploadProps['beforeUpload'] = async file => {
    if (!OSSData) return false

    const expire = Number(OSSData.expire) * 1000

    if (expire < Date.now()) {
      await refetch()
    }

    return file
  }

  return (
    <ImgCrop rotationSlider showReset>
      <Upload
        name="file"
        maxCount={1}
        fileList={value}
        listType="picture-card"
        action={OSSData?.host}
        data={getExtraData}
        onChange={handleChange}
        beforeUpload={beforeUpload}
      >
        <Space direction="vertical">
          <PlusOutlined />
          {label}
        </Space>
      </Upload>
    </ImgCrop>
  )
}
export default OSSImageUpload
