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

export function getName() {
  return request({
    url: api.getName,
    method: 'get'
  })
}

export function cmsApplPage(params) {
  return request({
    url: api.cmsApplPage,
    method: 'get',
    params: params
  })
}

export function cmsAppl(data) {
  return request({
    url: api.cmsAppl,
    method: 'POST',
    data
  })
}

export function applPage(params) {
  return request({
    url: api.applPage,
    method: 'get',
    params: params
  })
}

export function cmsColContAppl(data) {
  return request({
    url: api.cmsColContAppl,
    method: 'POST',
    data
  })
}

export function allselect(params) {
  return request({
    url: api.allselect,
    method: 'get',
    params: params
  })
}

export function Alllin(params) {
  return request({
    url: api.Alllin,
    method: 'get',
    params: params
  })
}

export function colcont(data) {
  return request({
    url: api.colcont,
    method: 'POST',
    data
  })
}
// colTtl: "qwqwqqwq"
// name: "无"
// prntColNo: "0"

export function cmsCol(data) {
  return request({
    url: api.cmsCol,
    method: 'POST',
    data
  })
}

export function edit(data) {
  return request({
    url: api.edit,
    method: 'POST',
    data
  })
}

