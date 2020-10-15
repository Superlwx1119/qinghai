import
PROD_CONFIG
  from '@/utils/server.js'
const hsaMbaInc = PROD_CONFIG.hsaMbaInc
//  hsa-mba-inc
export default {
  //  单位核销处理
  saveCancelPayInfo: hsaMbaInc + '/web/mba/inc/combizmgt/refund/empHiCanc/saveCancelPayInfo',
  //  查询个人明细
  listIndiPayInfoDetail: hsaMbaInc + '/web/mba/inc/combizmgt/refund/empHiCanc/listIndiPayInfoDetail',
  //  查询单位汇总明细
  listCorpPayInfoDetail: hsaMbaInc + '/web/mba/inc/combizmgt/refund/empHiCanc/listCorpPayInfoDetail',
  //  查询已核销单位缴费信息列表
  listPayInfoReq: hsaMbaInc + '/web/mba/inc/combizmgt/refund/empHiCanc/listPayInfoReq',
  //  查询待核销单位缴费明细列表
  listPayInfo: hsaMbaInc + '/web/mba/inc/combizmgt/refund/empHiCanc/listPayInfo',
  //  对单位进行核销审核处理
  saveCancelReq: hsaMbaInc + '/web/mba/inc/combizmgt/refund/empCancChk/saveCancelReq',
  //  查询单位缴费信息列表
  listPayInfoReqAll: hsaMbaInc + '/web/mba/inc/combizmgt/refund/empCancChk/listPayInfoReq',

  //  审核人员信息
  saveCancelIndiPayInfo: hsaMbaInc + '/web/mba/inc/combizmgt/refund/psnCancChk/saveCancelIndiPayInfo',
  //  查询待审核人员缴费信息列表
  listIndiPayInfoReq: hsaMbaInc + '/web/mba/inc/combizmgt/refund/psnCancChk/listIndiPayInfoReq',
  //  对个人信息进行核销申请
  saveCancelIndiPayInfo1: hsaMbaInc + '/web/mba/inc/combizmgt/refund/psnCanc/saveCancelIndiPayInfo',
  //  查询个人已核销信息列表
  listIndiPayInfoReq1: hsaMbaInc + '/web/mba/inc/combizmgt/refund/psnCanc/listIndiPayInfoReq',

  //  查询个人已核销信息列表明细
  listIndiPayInfoDetail1: hsaMbaInc + '/web/mba/inc/combizmgt/refund/psnCanc/listIndiPayInfoDetail',
  //  查询待核销人员明细列表
  listPayInfo1: hsaMbaInc + '/web/mba/inc/combizmgt/refund/psnCanc/listPayInfo'
}
