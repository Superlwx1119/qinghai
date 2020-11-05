export default [
  // { type: 'selection' },
  { type: 'index', label: '序号', width: '50' },
  { prop: 'uact', label: '用户账号' },
  { prop: 'userName', label: '姓名' },
  {
    prop: 'certNO',
    label: '证件号码'
  },
  {
    prop: 'tel',
    label: '办公电话'
  },
  {
    prop: 'mob',
    label: '手机号码'
  },
  {
    prop: 'uactStas',
    label: '账号状态',
    type: 'custom',
    slotName: 'zhzt',
    width: 100
  },
  {
    prop: 'orgName',
    label: '组织机构名称'
  },
  {
    prop: 'dscr',
    label: '描述信息',
    width: 200
  },
  {
    type: 'operation',
    label: '操作',
    fixed: 'right',
    width: '80px'
  }
]
