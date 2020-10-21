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
