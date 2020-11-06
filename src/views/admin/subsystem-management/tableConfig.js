export const tableColumns = [
  { type: 'selection' },
  { label: '序号', type: 'index' },
  { prop: 'subsysName', label: '子系统名称' },
  { prop: 'subsysCodg', label: '子系统编码', width: 120 },
  { prop: 'sysPath', label: '系统路', width: 300 },
  { prop: 'crterName', label: '经办人' },
  { prop: 'crteTime', label: '经办时间', type: 'custom', slotName: 'crteTime' },
  // { prop: 'crteTime', label: '经办时间', customProp: 'date', format: 'YYYY-MM-DD HH:MM:ss' },
  { prop: 'dscr', label: '说明', width: 300 },
  { type: 'operation', label: '操作', fixed: 'right', width: 130 }
]
