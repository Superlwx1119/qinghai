// 接口
import request from '@/utils/request'
import
PROD_CONFIG
  from '@/utils/server.js'
const hsaMbaInc = PROD_CONFIG.hsaMbaInc
/**
 * 表格查询
 * @param query
 */
export function listCorpInfo(query) {
  return request({
    url: hsaMbaInc + '/web/mba/inc/combizmgt/rsdtstdt/listCorpInfo',
    method: 'post',
    data: query
  })
}
