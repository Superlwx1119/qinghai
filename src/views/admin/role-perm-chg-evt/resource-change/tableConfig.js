export const tableColumns = [
  { type: 'selection' },
  { label: '序号', type: 'index' },
  { prop: 'resuName', label: '资源名称' },
  { prop: 'resuType', label: '资源类型', width: 120, type: 'custom', slotName: 'resuType' },
  { prop: 'resuPath', label: '资源路径', width: 700 },
  { prop: 'chgType', label: '变更类型', width: 120, type: 'custom', slotName: 'chgType' },
  { prop: 'opterName', label: '经办人' },
  { prop: 'optTime', label: '经办时间', type: 'custom', slotName: 'optTime' }
]
