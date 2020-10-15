// 单位医疗保险核销
import request from '@/utils/request'
import api from './api'

//  单位核销处理
export function saveCancelPayInfo(data) {
  return request({
    url: api.saveCancelPayInfo,
    method: 'post',
    data
  })
}

//  查询个人明细
export function listIndiPayInfoDetail(data) {
  return request({
    url: api.listIndiPayInfoDetail,
    method: 'post',
    data
  })
}

//  查询单位汇总明细
export function listCorpPayInfoDetail(data) {
  return request({
    url: api.listCorpPayInfoDetail,
    method: 'post',
    data
  })
}

//  查询已核销单位缴费信息列表
export function listPayInfoReq(data) {
  return request({
    url: api.listPayInfoReq,
    method: 'post',
    data
  })
}

//  查询待核销单位缴费明细列表
export function listPayInfo(data) {
  return request({
    url: api.listPayInfo,
    method: 'post',
    data
  })
}
