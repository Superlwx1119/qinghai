export const tableColumns = [
  { label: '序号', type: 'index' },
  { prop: 'resuName', label: '菜单名称' },
  { prop: 'subsysId', label: '子系统', type: 'custom', slotName: 'subsysId' },
  { prop: 'menuPath', label: '菜单路径' },
  { prop: 'crteTime', label: '经办时间', type: 'custom', slotName: 'crteTime' },
  { type: 'operation', label: '操作', fixed: 'right', width: 130 }
]
