import request from '@/utils/request'
import api from './Api.js'

/**
 * 查询单位预缴款余额列表
 * @param query
 */
export function listCorpPredMoney(query) {
  return request({
    url: api.listCorpPredMoney,
    method: 'post',
    data: query
  })
}

/**
 * 查询单位预缴款变化
 * @param query
 */
export function listCorpPredMoneyModify(query) {
  return request({
    url: api.listCorpPredMoneyModify,
    method: 'post',
    data: query
  })
}

/**
 * 查询单位预缴款余额调整申请记录
 * @param query
 */
export function listCorpPredMoneyModifyReq(query) {
  return request({
    url: api.listCorpPredMoneyModifyReq,
    method: 'post',
    data: query
  })
}

/**
 * 对单位预缴款调整申请记录进行审核
 * @param query
 */
export function saveCorpPredMoneyModiAud(query) {
  return request({
    url: api.saveCorpPredMoneyModiAud,
    method: 'post',
    data: query
  })
}

/**
 * 保存单位预缴款调整申请记录
 * @param query
 */
export function saveCorpPredMoneyModiReq(query) {
  return request({
    url: api.saveCorpPredMoneyModiReq,
    method: 'post',
    data: query
  })
}

/**
 * 删除未审核单位预缴款余额列表
 * @param query
 */
export function deleteCorpPredMoney(query) {
  return request({
    url: api.deleteCorpPredMoney,
    method: 'post',
    data: query
  })
}

/**
 * 查险种
 * @param query
 */
export function getInsutype(query) {
  return request({
    url: api.getInsutype,
    method: 'post',
    data: query
  })
}
