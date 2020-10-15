/*
  公共Api
 */
import request from '@/utils/request'
import api from './Api.js'
/**
 * 文件管理？
 * @param query
 */
export function beforeFact(params) {
  return request({
    url: api.beforeFact,
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
