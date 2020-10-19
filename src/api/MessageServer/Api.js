import
PROD_CONFIG
  from '@/utils/server.js'
const ips = PROD_CONFIG.ips
export default {
  getAddrBookByPage: ips + '/admin/web/admin/offSmsD/getAddrBookByPage', // 短信接收人信息表---通讯录
  getGrpByPage: ips + '/admin/web/admin/offSmsD/getGrpByPage' // 短信接收人信息表---通讯录组
}
