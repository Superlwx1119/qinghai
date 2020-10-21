import
PROD_CONFIG
  from '@/utils/server.js'
const ips = PROD_CONFIG.ips
export default {
  // 通讯录
  bookpage: ips + '/admin/web/admin/offAddrbookB/page',
  offAddrbookB: ips + '/admin/web/admin/offAddrbookB',
  addrBookpage: ips + '/admin/web/admin/offAddrbookGrpD/addrBookpage',
  offAddrbookGrpD: ips + '/admin/web/admin/offAddrbookGrpD'
//  /ips/admin/web/admin/offAddrbookB
// ips/admin/web/admin/offAddrbookB/page?pageSize: 10
// pageNumber: 1
// total: 890
// tel: 2
// userName: 1
// email: 3
// mob: 4
}
