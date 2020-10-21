import request from '@/utils/request'
import api from './Api.js'
/**
 * 查询通讯录
 * @param
 */
export function bookpage(params) {
  return request({
    url: api.bookpage,
    method: 'get',
    params: params
  })
}

export function offAddrbookB(data) {
  return request({
    url: api.offAddrbookB,
    method: 'post',
    data
  })
}

export function addrBookpage(params) {
  return request({
    url: api.addrBookpage,
    method: 'get',
    params: params
  })
}

export function offAddrbookGrpD(data) {
  return request({
    url: api.offAddrbookGrpD,
    method: 'post',
    data
  })
}

export function offAddrbookGrpDpage(params) {
  return request({
    url: api.offAddrbookGrpDpage,
    method: 'get',
    params: params
  })
}

export function queryAllGrpName(params) {
  return request({
    url: api.queryAllGrpName,
    method: 'get',
    params: params
  })
}

export function getGrpPage(params) {
  return request({
    url: api.getGrpPage + '/' + params.addrbookGrpId,
    method: 'get',
    params: params
  })
}

export function dbtAddr(data) {
  return request({
    url: api.dbtAddr,
    method: 'post',
    data
  })
}

