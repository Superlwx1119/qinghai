/*
  公共Api
 */
import request from '@/utils/request'
import api from './Api.js'
/**
 * 查询组织机构
 * @param id
 */
export function unit(id) {
  return request({
    url: api.units + `/${id}/sub`,
    method: 'get'
  })
}
/**
 * 查询所有子系统
 * @param query
 */
export function sysAll() {
  return request({
    url: api.sysAll,
    method: 'get'
  })
}
/**
 * 查询登录信息
 * @param query
 */
export function current() {
  return request({
    url: api.current,
    method: 'get'
  })
}
/**
 * 查询医保区划
 * @param query
 */
export function admdvs(params) {
  return request({
    url: api.admdvs,
    method: 'get',
    params: params
  })
}

/**
 * 查询登录信息
 * @param query
 */
export function getCurrentUser() {
  return request({
    url: api.getCurrentUser,
    method: 'get'
  })
}
/**
 * 查询码表数据
 * @param query
 */
export function getCodeTableDetailConvergence(query) {
  return request({
    url: api.getCodeTableDetailConvergence,
    method: 'post',
    data: query
  })
}

/**
 * 人员基本信息查询
 * @param data
 */
export function queryPsnBasicInfo(data) {
  return request({
    url: api.queryPsnBasicInfo,
    method: 'POST',
    data
  })
}

/**
 * 人员参保信息查询
 * @param data
 */
export function queryPsnInsuInfo(data) {
  return request({
    url: api.queryPsnInsuInfo,
    method: 'POST',
    data
  })
}

/**
 * 单位基本信息查询
 * @param data
 */
export function queryEmpBasicInfo(data) {
  return request({
    url: api.queryEmpBasicInfo,
    method: 'POST',
    data
  })
}

/**
 * 单位基本信息查询
 * @param data
 */
export function queryAdmdvs(data) {
  return request({
    url: api.queryAdmdvs,
    method: 'POST',
    data
  })
}

/**
 * 银行基本信息
 * @param data
 */
export function queryBankBasInfo(data) {
  return request({
    url: api.queryBankBasInfo,
    method: 'POST',
    data
  })
}
