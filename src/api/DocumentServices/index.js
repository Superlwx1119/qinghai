/*
  公共Api
 */
// import fileRequest from '@/utils/fileRequest'
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
/**
 * 文件管理？
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
 * 文件管理？
 * @param query
 */
export function getFileCollocation(params) {
  return request({
    url: api.getFileCollocation,
    method: 'get',
    data: params
  })
}

/**
 * 文件管理？
 * @param query
 */
export function getUrl(params) {
  return request({
    url: api.getUrl,
    method: 'get',
    data: params
  })
}

/**
 * 文件下载
 */
export function downLoadFile(data) {
  return request({
    url: api.downLoadFile,
    method: 'post',
    data
  })
}

/**
 * 文件说明修改
 */
export function offFileD(data) {
  return request({
    url: api.offFileD,
    method: 'put',
    data
  })
}

/**
 * 文件说明修改
 */
export function offFileDelete(query) {
  return request({
    url: api.offFileD,
    method: 'delete',
    params: query
  })
}

/**
 * 分享列表查询通讯录
 */
export function share(query) {
  return request({
    url: api.share,
    method: 'get',
    params: query
  })
}

/**
 * 分享列表查询通讯录
 */
export function getGrpByPage(query) {
  return request({
    url: api.getGrpByPage,
    method: 'get',
    params: query
  })
}

/**
 * 分享列表查询通讯录
 */
export function getGrpMsgPage(params) {
  console.log(params)
  return request({
    url: api.getGrpMsgPage + '/' + params.addrbookGrpNo,
    method: 'get',
    params: params
  })
}
