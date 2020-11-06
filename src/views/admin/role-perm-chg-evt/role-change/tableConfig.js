export const tableColumns = [
  { type: 'selection' },
  { label: '序号', type: 'index' },
  { prop: 'roleName', label: '角色名称' },
  { prop: 'initRoleName', label: '原角色名称' },
  { prop: 'roleType', label: '角色类型', type: 'custom', slotName: 'roleType' },
  { prop: 'chgType', label: '变更类型', type: 'custom', slotName: 'chgType' },
  { prop: 'opterName', label: '经办人' },
  { prop: 'optTime', label: '经办时间', type: 'custom', slotName: 'optTime' }
]
