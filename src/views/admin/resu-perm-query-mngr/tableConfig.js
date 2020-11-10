export const tableColumns = [
  { type: 'selection' },
  { label: '序号', type: 'index' },
  { label: '用户账号', prop: 'uact', width: '180px', align: 'left' },
  { label: '姓名', prop: 'userName', width: '180px', align: 'left' },
  { label: '证件号码', prop: 'certNO', width: '180px', align: 'left' },
  { label: '办公电话', prop: 'tel', width: '180px', align: 'left' },
  { label: '手机号码', prop: 'mob', width: '180px', align: 'left' },
  { label: '账号状态', prop: 'uactStas', width: '180px', align: 'center', type: 'custom', slotName: 'uactStas' },
  { label: '组织机构', prop: 'orgName', width: '180px', align: 'left' },
  { label: '描述信息', prop: 'dscr', align: 'left' }
]
