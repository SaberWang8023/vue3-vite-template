import { upLoadFile } from '@/api/file'
import { type UploadProps } from 'ant-design-vue'

export const useCustomUpload = () => {
  const customUpload: UploadProps['customRequest'] = ({ file, onSuccess }) => {
    const formData = new FormData()
    formData.append('file', file)
    void upLoadFile(formData).then((res) => {
      onSuccess?.(res)
    })
  }

  return { customUpload }
}
