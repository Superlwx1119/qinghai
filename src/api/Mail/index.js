/*
  公共Api
 */
import request from '@/utils/request'
import api from './Api.js'
/**
 * 邮件查询
 * @param query
 */
export function queryMail(params) {
  return request({
    url: api.queryMail,
    method: 'get',
    params: params
  })
}

export function getUnReadCount() {
  return request({
    url: api.getUnReadCount,
    method: 'get'
  })
}

/**
 * @param query
 */
export function getStarEMailList(query) {
  return request({
    url: api.getStarEMailList,
    method: 'get',
    params: query
  })
}

/**
 * @param query
 */
export function getEMailInbox(query) {
  return request({
    url: api.getEMailInbox,
    method: 'get',
    params: query
  })
}
/**
 * @param query
 */
export function getDraft(query) {
  return request({
    url: api.getDraft,
    method: 'get',
    params: query
  })
}
/**
 * @param query
 */
export function getEMailOutbox(query) {
  return request({
    url: api.getEMailOutbox,
    method: 'get',
    params: query
  })
}
/**
 * @param query
 */
export function getEMailBin(query) {
  return request({
    url: api.getEMailBin,
    method: 'get',
    params: query
  })
}
/**
 * @param query
 */
export function getArchiveEMailList(query) {
  return request({
    url: api.getArchiveEMailList,
    method: 'get',
    params: query
  })
}

export function getGrpByPage(params) {
  return request({
    url: api.getGrpByPage,
    method: 'get',
    params: params
  })
}

export function getGrpMsgPage(params) {
  return request({
    url: api.getGrpMsgPage + params.addrbookGrpNo,
    method: 'get'
  })
}

export function offEmailD(data) {
  return request({
    url: api.offEmailD,
    method: 'post',
    data
  })
}

export function saveDraft(data) {
  return request({
    url: api.saveDraft,
    method: 'post',
    data
  })
}

export function addGroup(params) {
  return request({
    url: api.addGroup + '/' + params,
    method: 'get',
    data: params
  })
}

/**
 * 从通讯录中选择收件人
 * @param query
 */
export function recer(query) {
  return request({
    url: api.recer,
    method: 'get',
    params: query
  })
}

/**
 * 删除一条邮件
 */
export function deleteEMailByReceiver(params) {
  return request({
    url: api.deleteEMailByReceiver + '/' + params,
    method: 'get',
    data: params
  })
}

/**
 * 查询分组管理
 * @param query
 */
export function getEMailGroups(query) {
  return request({
    url: api.getEMailGroups,
    method: 'get',
    params: query
  })
}

/**
 * 删除分组管理
*/
export function delTree(params) {
  return request({
    url: api.delTree + '/' + params,
    method: 'get',
    data: params
  })
}

/**
 * 选择数据进行归档
 * @param query
*/
export function updateArchiveStatus(query) {
  return request({
    url: api.updateArchiveStatus,
    method: 'post',
    data: query
  })
}
