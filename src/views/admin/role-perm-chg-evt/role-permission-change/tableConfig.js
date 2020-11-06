export const tableColumns = [
  { type: 'selection' },
  { label: '序号', type: 'index' },
  { prop: 'roleName', label: '角色名称' },
  { prop: 'resuName', label: '资源名称' },
  { prop: 'resuType', label: '资源类型', type: 'custom', slotName: 'resuType' },
  { prop: 'chgType', label: '变更类型', type: 'custom', slotName: 'chgType' },
  { prop: 'opterName', label: '经办人' },
  { prop: 'optTime', label: '经办时间', type: 'custom', slotName: 'optTime' }
]
