// 保存灵活就业征集信息发送审核
import
PROD_CONFIG
  from '@/utils/server.js'
import request from '@/utils/request'
const hsaMbaInc = PROD_CONFIG.hsaMbaInc

const getTaskUrl = hsaMbaInc + '/web/mba/inc/combizmgt/leaveunit/getTasks'
const getAcceptDetailUrl = hsaMbaInc + '/web/mba/inc/combizmgt/leaveunit/getAcceptDetail'
export default {
  getTasks,
  getAcceptDetail
}
/**
 * 查询已获取事项列表
 * @param data
 */
export function getTasks(data) {
  return request({
    url: getTaskUrl,
    method: 'post',
    data
  })
}
/**
 * 查询受理详情
 * @param data
 */
export function getAcceptDetail(data) {
  return request({
    url: getAcceptDetailUrl,
    method: 'post',
    data
  })
}
