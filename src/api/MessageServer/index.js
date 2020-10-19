
import request from '@/utils/request'
import api from './Api.js'
/**
 * 被分享文件管理？
 * @param query
 */
export function offFileShrPage(params) {
  return request({
    url: api.offFileShrPage,
    method: 'get',
    params: params
  })
}
