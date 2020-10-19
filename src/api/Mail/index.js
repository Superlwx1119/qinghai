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

