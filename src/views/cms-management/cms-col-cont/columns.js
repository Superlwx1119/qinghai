export default [
  { type: 'selection' },
  { type: 'index', label: '序号' },
  { prop: 'stdName', label: '栏目标题', minWidth: 120 },
  { prop: 'appyDateStr', label: '审批人', minWidth: 120 },
  { prop: 'crtNodeName', label: '审批时间', minWidth: 120 },
  { prop: 'recbSumamt', label: '审批意见', textColor: '#49A1F9' },
  { prop: 'addClctStasName', label: '审批结果', minWidth: 120 },
  { prop: 'addClctStasName', label: '提交状态', minWidth: 120 },
  { type: 'operation', label: '操作', fixed: 'right', width: '90px' }
]
