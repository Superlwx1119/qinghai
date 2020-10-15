// 文件上传通用接口
import request from '@/utils/request'
import fileRequest from '@/utils/fileRequest'

/**
 * 码表
 * @param query
 */
export function getCodeTableDetailConvergence(query) {
  return request({
    url: '/web/common/codetable/getCodeTableDetailConvergence',
    method: 'post',
    data: query
  })
}

/**
 * 文件上传
 * @param query
 */
export function fileUpload(query) {
  return fileRequest({
    url: '/web/file/upload',
    method: 'post',
    data: query
  })
}

/**
 * 文件删除
 * @param query
 */
export function fileDelete(query) {
  return fileRequest({
    url: '/web/file/del',
    method: 'post',
    data: query
  })
}

/**
 * 文件下载
 * @param query
 */
export function fileDownload(query) {
  return fileRequest({
    url: '/web/file/download',
    method: 'post',
    data: query
  })
}
