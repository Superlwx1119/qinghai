
import request from '@/utils/request'
import api from './Api.js'
/**
 * 通讯录
 * @param query
 */
export function getAddrBookByPage(params) {
  return request({
    url: api.getAddrBookByPage,
    method: 'get',
    params: params
  })
}
/**
 * 通讯录组
 * @param query
 */
export function getGrpByPage(params) {
  return request({
    url: api.getGrpByPage,
    method: 'get',
    params: params
  })
}
/**
 * 通讯录组详情
 * @param query
 */
export function getGrpMsgPage(params) {
  return request({
    url: api.getGrpMsgPage + '/' + params.addrbookGrpNo,
    method: 'get',
    params: params
  })
}
/**
 *
 * @param query
 */
export function page(params) {
  return request({
    url: api.page,
    method: 'get',
    params: params
  })
}

/**
 *
 * @param query
 */
export function offMsgD(params) {
  return request({
    url: api.offMsgD,
    method: 'post',
    data: params
  })
}

/**
 * @param query
 *  回复
 */
export function reply(params) {
  return request({
    url: api.reply,
    method: 'post',
    data: params
  })
}

/**
 * 发件箱
 * @param query
 */
export function outBox(params) {
  return request({
    url: api.outBox,
    method: 'get',
    params: params
  })
}

/**
 *
 * @param query
 */
export function share(params) {
  return request({
    url: api.share,
    method: 'get',
    params: params
  })
}

/**
 * 短信信息列表-保存
 * @param query
 */
export function addSms(params) {
  return request({
    url: api.addSms,
    method: 'post',
    params: params
  })
}
/**
 * 短信信息列表-保存
 * @param query
 */
export function getSmsApprByPage(params) {
  return request({
    url: api.getSmsApprByPage,
    method: 'get',
    params: params
  })
}
