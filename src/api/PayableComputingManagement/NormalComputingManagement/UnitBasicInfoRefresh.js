/*
*单位基础信息刷新/政策刷新/征缴期间设置(页面)
*/
import request from '@/utils/request'
import PROD_CONFIG from '@/utils/server.js'
const hsaMbaInc = PROD_CONFIG.hsaMbaInc

/*
*单位基础信息刷新(页面)
*/

// 将单位的基本信息初始化redis内存数据库中
const saverpInfo = hsaMbaInc + '/web/mba/inc/topay/corpInfoRefresh/saveCorpInfo'

export function saveCorpInfo(data) {
  return request({
    url: saverpInfo,
    method: 'post',
    data
  })
}

// 将单位职工的基本信息初始化redis内存数据库中
const saveBatchInfo = hsaMbaInc + '/web/mba/inc/topay/corpInfoRefresh/saveBatchCorpInfo'

export function saveBatchCorpInfo(data) {
  return request({
    url: saveBatchInfo,
    method: 'post',
    data
  })
}

// 将灵活就业基本信息初始化redis内存数据库中
const savePerInfo = hsaMbaInc + '/web/mba/inc/topay/corpInfoRefresh/savePersonInfo'

export function savePersonInfo(data) {
  return request({
    url: savePerInfo,
    method: 'post',
    data
  })
}

/*
*政策刷新(页面)
*/

// 将职工和居民的政策初始化到redis内存数据库中。
const savePo = hsaMbaInc + '/web/mba/inc/topay/policyRefresh/savePolicy'

export function savePolicy(data) {
  return request({
    url: savePo,
    method: 'post',
    data
  })
}

