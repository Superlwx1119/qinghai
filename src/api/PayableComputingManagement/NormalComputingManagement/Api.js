import
PROD_CONFIG
  from '@/utils/server.js'
const hsaMbaInc = PROD_CONFIG.hsaMbaInc
//  hsa-mba-inc
export default {
  //  获取款项
  listFinc: hsaMbaInc + '/web/mba/inc/polmgt/stafpol/workersPolicyManage/listFinc',

  //  查询职工政策列表
  reviewListPolicyInfo: hsaMbaInc + '/web/mba/inc/polmgt/stafpol/workersPolicyAudit/listPolicyInfo',
  //  查询职工政策明细
  reviewListPolicyDetail: hsaMbaInc + '/web/mba/inc/polmgt/stafpol/workersPolicyAudit/listPolicyDetail',
  //  审核职工政策
  reviewSavePolicy: hsaMbaInc + '/web/mba/inc/polmgt/stafpol/workersPolicyAudit/savePolicy',

  /**
   * 职工政策维护
   */

  //  查询职工政策数据列表
  listPolicyInfo: hsaMbaInc + '/web/mba/inc/polmgt/stafpol/workersPolicyManage/listPolicyInfo',
  //  获取要素列表
  listElemByType: hsaMbaInc + '/web/mba/inc/polmgt/stafpol/workersPolicyManage/listElemByType',
  //  获取政策类型列表
  listPolType: hsaMbaInc + '/web/mba/inc/polmgt/stafpol/workersPolicyManage/listPolType',
  //  删除政策
  deletePolicy: hsaMbaInc + '/web/mba/inc/polmgt/stafpol/workersPolicyManage/deletePolicy',
  //  保存修改的基数要素
  saveUpdatePolicyBase: hsaMbaInc + '/web/mba/inc/polmgt/stafpol/workersPolicyManage/saveUpdatePolicyBase',
  //  保存修改的条件要素
  saveUpdatePolicyCond: hsaMbaInc + '/web/mba/inc/polmgt/stafpol/workersPolicyManage/saveUpdatePolicyCond',
  //  保存修改的比例要素
  saveUpdatePolicyRate: hsaMbaInc + '/web/mba/inc/polmgt/stafpol/workersPolicyManage/saveUpdatePolicyRate',
  //  保存修改的职工政策
  saveUpdatePolicy: hsaMbaInc + '/web/mba/inc/polmgt/stafpol/workersPolicyManage/saveUpdatePolicy',
  //  保存新增基数要素
  saveAddPolicyBase: hsaMbaInc + '/web/mba/inc/polmgt/stafpol/workersPolicyManage/saveAddPolicyBase',
  //  保存新增政策
  saveAddPolicy: hsaMbaInc + '/web/mba/inc/polmgt/stafpol/workersPolicyManage/saveAddPolicy',
  //  保存新增条件要素
  saveAddPolicyCond: hsaMbaInc + '/web/mba/inc/polmgt/stafpol/workersPolicyManage/saveAddPolicyCond',
  //  保存新增比例要素
  saveAddPolicyRate: hsaMbaInc + '/web/mba/inc/polmgt/stafpol/workersPolicyManage/saveAddPolicyRate'
}
