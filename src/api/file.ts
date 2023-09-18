import { ajax } from './ajax-init'

export interface UploadFileRes {
  /** 文件下载地址 */
  downloadUrl: string
  /** 文件id */
  fileId: string
  /** 文件Key */
  fileKey: string
  /** 文件名 */
  fileName: string
  /** 上传时间 */
  uploadTime: string
  /** 上传人 */
  uploader: string
  /** 上传人id */
  uploaderId: string
}

export const upLoadFile = (data: any) =>
  ajax.post<UploadFileRes>('/encourage/api/v1/file/upload', { headers: { 'Content-Type': 'multipart/form-data' }, data })
