import
PROD_CONFIG
  from '@/utils/server.js'
const hsaMbaInc = PROD_CONFIG.hsaMbaInc
export default {
  //  查询单位预缴款余额列表 /hsa-mba-inc
  listCorpPredMoney: hsaMbaInc + '/web/mba/inc/paymgt/advancepaymgt/listCorpPredMoney',
  //  查询单位预缴款变化
  listCorpPredMoneyModify: hsaMbaInc + '/web/mba/inc/paymgt/advancepaymgt/listCorpPredMoneyModify',
  //  查询单位预缴款余额调整申请记录
  listCorpPredMoneyModifyReq: hsaMbaInc + '/web/mba/inc/paymgt/advancepaymgt/listCorpPredMoneyModifyReq',
  //  对单位预缴款调整申请记录进行审核
  saveCorpPredMoneyModiAud: hsaMbaInc + '/web/mba/inc/paymgt/advancepaymgt/saveCorpPredMoneyModiAud',
  //  保存单位预缴款调整申请记录
  saveCorpPredMoneyModiReq: hsaMbaInc + '/web/mba/inc/paymgt/advancepaymgt/saveCorpPredMoneyModiReq',
  //  删除未审核单位预缴款余额列表
  deleteCorpPredMoney: hsaMbaInc + '/web/mba/inc/paymgt/advancepaymgt/deleteCorpPredMoney',
  //  查险种
  getInsutype: hsaMbaInc + '/web/mba/inc/paymgt/advancepaymgt/getInsutype'

}
