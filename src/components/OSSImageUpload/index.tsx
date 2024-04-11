import { GET_OSS_INFO } from '@/graphql/oss'
import { IOSSDataType } from '@/types/oss.type'
import { useQuery } from '@/utils/apollo'
import { PlusOutlined } from '@ant-design/icons'
import { Upload, UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'

interface AliyunOSSUploadProps {
  label?: string
  value?: UploadFile[]
  onChange?: (file: UploadFile[]) => void
  maxCount?: number
  imgCropAspect?: number
}

/**
 * 图片上传
 */
const OSSImageUpload = ({
  label,
  value,
  onChange,
  maxCount,
  imgCropAspect,
}: AliyunOSSUploadProps) => {
  const { data, refetch } = useQuery<{ getOSSInfo: IOSSDataType }>(GET_OSS_INFO)
  const OSSData = data?.getOSSInfo
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
    <ImgCrop rotationSlider showReset aspect={imgCropAspect}>
      <Upload
        name="file"
        maxCount={maxCount ?? 1}
        fileList={value}
        listType="picture-card"
        action={OSSData?.host}
        data={getExtraData}
        onChange={handleChange}
        beforeUpload={beforeUpload}
      >
        <PlusOutlined />
        {label}
      </Upload>
    </ImgCrop>
  )
}
OSSImageUpload.defaultProps = {
  label: '上传图片',
  // value: null,
  // onChange: () => {},
  maxCount: 1,
  imgCropAspect: 1 / 1,
}
export default OSSImageUpload
