import
PROD_CONFIG
  from '@/utils/server.js'
const ips = PROD_CONFIG.ips
export default {
  // 通讯录
  bookpage: ips + '/admin/web/admin/offAddrbookB/page',
  offAddrbookB: ips + '/admin/web/admin/offAddrbookB',
  addrBookpage: ips + '/admin/web/admin/offAddrbookGrpD/addrBookpage',
  offAddrbookGrpD: ips + '/admin/web/admin/offAddrbookGrpD',
  offAddrbookGrpDpage: ips + '/admin/web/admin/offAddrbookGrpD/page', // 通讯录查询\
  queryAllGrpName: ips + '/admin/web/admin/offAddrbookGrpD/queryAllGrpName', // 获取个人通讯录组名称
  getGrpPage: ips + '/admin/web/admin/offAddrbookGrpD/getGrpPage', // 获取个人通讯录组-组内列表
  dbtAddr: ips + '/admin/web/admin/offAddrbookGrpD/dbtAddr',

  offAddrbookGrpDput: ips + '/admin/web/admin/offAddrbookGrpD', // 修改界面保存 put请求
  offAddrbookGrpDdelet: ips + '/admin/web/admin/offAddrbookGrpD',
  deleteGrpD: ips + '/admin/web/admin/offAddrbookGrpD/deleteGrpD'

  // / admin/web/admin/offAddrbookGrpD/dbtAddr
  // /admin/web/admin/offAddrbookGrpD/getGrpPage/202010171101030000000101130000
//  /ips/admin/web/admin/offAddrbookB
// ips/admin/web/admin/offAddrbookB/page?pageSize: 10
// pageNumber: 1
// total: 890
// tel: 2
// userName: 1
// email: 3
// mob: 4
// admin/web/admin/offAddrbookGrpD/deleteGrpD
}
