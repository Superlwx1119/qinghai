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

export function getStarEMailList() {
  return request({
    url: api.getStarEMailList,
    method: 'get'
  })
}

export function getEMailInbox() {
  return request({
    url: api.getEMailInbox,
    method: 'get'
  })
}

export function getDraft() {
  return request({
    url: api.getDraft,
    method: 'get'
  })
}

export function getEMailOutbox() {
  return request({
    url: api.getEMailOutbox,
    method: 'get'
  })
}

export function getEMailBin() {
  return request({
    url: api.getEMailBin,
    method: 'get'
  })
}

export function getArchiveEMailList() {
  return request({
    url: api.getArchiveEMailList,
    method: 'get'
  })
}
