import request from '@/utils/request'
import api from './Api.js'
/**
 * CMS
 * @param
 */
export function cmsPage(params) {
  return request({
    url: api.cmsPage,
    method: 'get',
    params: params
  })
}

export function cmstmpl(data) {
  return request({
    url: api.cmstmpl,
    method: 'POST',
    data
  })
}

export function cmsedit(data) {
  return request({
    url: api.cmsedit,
    method: 'POST',
    data
  })
}

export function cmsdel(data) {
  return request({
    url: api.cmsdel + '/' + data,
    method: 'POST'
  })
}

export function cmsadd(data) {
  return request({
    url: api.cmsadd,
    method: 'POST',
    data
  })
}

export function orgName() {
  return request({
    url: api.orgName,
    method: 'get'
  })
}

