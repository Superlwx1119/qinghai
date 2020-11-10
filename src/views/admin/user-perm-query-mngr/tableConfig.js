export const tableColumns = [
  { type: 'selection' },
  { label: '序号', type: 'index' },
  { label: '角色名称', prop: 'roleName', align: 'left' },
  { label: '角色类别', prop: 'valiFlag', type: 'custom', slotName: 'valiFlag' },
  { label: '描述信息', prop: 'dscr', align: 'left' }
]
