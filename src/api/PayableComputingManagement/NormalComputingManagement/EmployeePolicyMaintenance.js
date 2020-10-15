import request from '@/utils/request'
import api from './Api'

//  款项
export function listFinc(data) {
  return request({
    url: api.listFinc,
    method: 'post',
    data
  })
}

//  查询职工政策数据列表
export function listPolicyInfo(data) {
  return request({
    url: api.listPolicyInfo,
    method: 'post',
    data
  })
}

//  获取要素列表
export function listElemByType(data) {
  return request({
    url: api.listElemByType,
    method: 'post',
    data
  })
}

//  获取政策类型列表
export function listPolType(data) {
  return request({
    url: api.listPolType,
    method: 'post',
    data
  })
}

//  删除政策
export function deletePolicy(data) {
  return request({
    url: api.deletePolicy,
    method: 'post',
    data
  })
}

//  保存修改的基数要素
export function saveUpdatePolicyBase(data) {
  return request({
    url: api.saveUpdatePolicyBase,
    method: 'post',
    data
  })
}

//  保存修改的条件要素
export function saveUpdatePolicyCond(data) {
  return request({
    url: api.saveUpdatePolicyCond,
    method: 'post',
    data
  })
}

//  保存修改的比例要素
export function saveUpdatePolicyRate(data) {
  return request({
    url: api.saveUpdatePolicyRate,
    method: 'post',
    data
  })
}

//  保存修改的职工政策
export function saveUpdatePolicy(data) {
  return request({
    url: api.saveUpdatePolicy,
    method: 'post',
    data
  })
}

//  保存新增基数要素
export function saveAddPolicyBase(data) {
  return request({
    url: api.saveAddPolicyBase,
    method: 'post',
    data
  })
}

//  保存新增政策
export function saveAddPolicy(data) {
  return request({
    url: api.saveAddPolicy,
    method: 'post',
    data
  })
}

//  保存新增条件要素
export function saveAddPolicyCond(data) {
  return request({
    url: api.saveAddPolicyCond,
    method: 'post',
    data
  })
}

//  保存新增比例要素
export function saveAddPolicyRate(data) {
  return request({
    url: api.saveAddPolicyRate,
    method: 'post',
    data
  })
}
