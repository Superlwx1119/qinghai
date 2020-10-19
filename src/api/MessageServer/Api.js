import
PROD_CONFIG
  from '@/utils/server.js'
const ips = PROD_CONFIG.ips
export default {
  getAddrBookByPage: ips + '/admin/web/admin/offSmsD/getAddrBookByPage', // 短信接收人信息表---通讯录
  getGrpMsgPage: ips + '/admin/offSmsD/getGrpMsgPage', // 短信接收人信息表---通讯录组详情
  getGrpByPage: ips + '/admin/web/admin/offSmsD/getGrpByPage', // 短信接收人信息表---通讯录组
  page: ips + '/admin/web/admin/offSmsD/page',
  offMsgD: ips + '/ips/admin/web/admin/offMsgD', // 发送消息
  outBox: ips + '/admin/web/admin/offMsgD/outBox' // 发件箱
}
