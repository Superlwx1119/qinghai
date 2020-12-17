
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

/**
 * 站内未读信
 * @param query
 */
export function getUnReadMsg(params) {
  return request({
    url: api.getUnReadMsg,
    method: 'get',
    params: params
  })
}

/**
 * 站内未读信
 * @param query
 */
export function mkread(params) {
  return request({
    url: api.mkread + '/' + params,
    method: 'get',
    data: params
  })
}
/**
 * 发件箱详情的收件人
 * @param query
 */
export function queryRecerName(params) {
  return request({
    url: api.queryRecerName + '/' + params,
    method: 'get',
    data: params
  })
}
/**
 * 删除发件箱详情的数据
 * @param query
 */
export function deleteInterMailBySender(params) {
  return request({
    url: api.deleteInterMailBySender + '/' + params,
    method: 'delete',
    data: params
  })
}
/**
 * 删除收件箱数据
 * @param query
 */
export function deleteInterMailByReceiver(params) {
  return request({
    url: api.deleteInterMailByReceiver + '/' + params,
    method: 'delete',
    data: params
  })
}
