import request from '@/utils/request'
import api from './Api'

//  查询职工政策列表
export function reviewListPolicyInfo(data) {
  return request({
    url: api.reviewListPolicyInfo,
    method: 'post',
    data
  })
}

//  查询职工政策明细
export function reviewListPolicyDetail(data) {
  return request({
    url: api.reviewListPolicyDetail,
    method: 'post',
    data
  })
}

//  查询职工政策审核
export function reviewSavePolicy(data) {
  return request({
    url: api.reviewSavePolicy,
    method: 'post',
    data
  })
}
