export const tableColumns = [
  { type: 'selection' },
  { label: '序号', type: 'index' },
  { prop: 'orgName', label: '组织机构名称' },
  { prop: 'orgCodg', label: '组织机构编码' },
  { prop: 'admdvs', label: '医保区划' },
  { prop: 'abbr', label: '简称' },
  { prop: 'chgType', label: '变更类型', type: 'custom', slotName: 'chgType' },
  { prop: 'opterName', label: '经办人' },
  { prop: 'optTime', label: '经办时间', type: 'custom', slotName: 'optTime' }
]
