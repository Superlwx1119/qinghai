export const tableColumns = [
  { type: 'selection' },
  { label: '序号', type: 'index' },
  { prop: 'uact', label: '用户账号' },
  { prop: 'pwdChgType', label: '密码变更类型', type: 'custom', slotName: 'pwdChgType' },
  { prop: 'opterName', label: '经办人' },
  { prop: 'optTime', label: '经办时间', type: 'custom', slotName: 'optTime' }
]
