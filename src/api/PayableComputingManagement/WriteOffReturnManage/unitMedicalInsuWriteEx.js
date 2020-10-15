
// 单位医疗保险核销审核
import request from '@/utils/request'
import api from './api'

//  对单位进行核销审核处理
export function saveCancelReq(data) {
  return request({
    url: api.saveCancelReq,
    method: 'post',
    data
  })
}

//  查询单位缴费信息列表
export function listPayInfoReqAll(data) {
  return request({
    url: api.listPayInfoReqAll,
    method: 'post',
    data
  })
}
