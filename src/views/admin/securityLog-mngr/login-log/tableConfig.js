export const tableColumns = [
  { type: 'selection' },
  { label: '序号', type: 'index' },
  { prop: 'uact', label: '用户账号' },
  { prop: 'userName', label: '用户姓名' },
  { prop: 'lginSuccFlag', label: '登录成功标志', type: 'custom', slotName: 'lginSuccFlag' },
  { prop: 'lginTime', label: '登录时间', type: 'custom', slotName: 'lginTime' },
  { prop: 'loutTime', label: '登出时间', type: 'custom', slotName: 'loutTime' },
  { prop: 'lginFailCnt', label: '登录失败次数' },
  { prop: 'lginAbnInfo', label: '登录异常信息' }
]
