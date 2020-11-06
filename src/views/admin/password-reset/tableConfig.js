export const tableColumns = [
  { type: 'selection' },
  { label: '序号', type: 'index' },
  { prop: 'uact', label: '用户账号' },
  { prop: 'userName', label: '姓名' },
  { prop: 'certNO', label: '证件号码' },
  { prop: 'tel', label: '办公电话' },
  { prop: 'mob', label: '手机号码' },
  { prop: 'uactStas', label: '账号状态', type: 'custom', slotName: 'uactStas' },
  { prop: 'medInc', label: '组织机构名称' },
  { prop: 'dscr', label: '描述信息' },
  { type: 'operation', label: '操作', fixed: 'right', width: 130 }
]
