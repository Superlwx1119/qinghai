
// 单位医疗保险核销审核
import request from '@/utils/request'
import api from './api'

//  审核人员信息
export function saveCancelIndiPayInfo(data) {
  return request({
    url: api.saveCancelIndiPayInfo,
    method: 'post',
    data
  })
}

//  查询待审核人员缴费信息列表
export function listIndiPayInfoReq(data) {
  return request({
    url: api.listIndiPayInfoReq,
    method: 'post',
    data
  })
}

//  对个人信息进行核销申请
export function saveCancelIndiPayInfo1(data) {
  return request({
    url: api.saveCancelIndiPayInfo1,
    method: 'post',
    data
  })
}

//  查询个人已核销信息列表
export function listIndiPayInfoReq1(data) {
  return request({
    url: api.listIndiPayInfoReq1,
    method: 'post',
    data
  })
}

//  查询个人已核销信息列表明细
export function listIndiPayInfoDetail1(data) {
  return request({
    url: api.listIndiPayInfoDetail1,
    method: 'post',
    data
  })
}

//  查询待核销人员明细列表
export function listPayInfo1(data) {
  return request({
    url: api.listPayInfo1,
    method: 'post',
    data
  })
}
