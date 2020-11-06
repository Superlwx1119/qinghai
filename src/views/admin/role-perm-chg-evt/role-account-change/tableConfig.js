export const tableColumns = [
  { type: 'selection' },
  { label: '序号', type: 'index' },
  { prop: 'roleName', label: '角色名称' },
  { prop: 'uact', label: '用户账号' },
  { prop: 'userName', label: '姓名' },
  { prop: 'roleType', label: '角色类型', type: 'custom', slotName: 'roleType' },
  { prop: 'chgType', label: '变更类型', type: 'custom', slotName: 'chgType' },
  { prop: 'opterName', label: '经办人' },
  { prop: 'optTime', label: '经办时间', type: 'custom', slotName: 'optTime' }
]
