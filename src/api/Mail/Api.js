import
PROD_CONFIG
  from '@/utils/server.js'
const ips = PROD_CONFIG.ips
export default {
  // 邮件管理
  queryMail: ips + '/admin/web/admin/email/offEmailD/getEMailInbox', // 邮件查询
  getUnReadCount: ips + '/admin/web/admin/email/offEmailD/getUnReadCount'
}
// 已发送
// /ips/admin/web/admin/email/offEmailD/getEMailOutbox
// ?pageSize=10&pageNumber=1&total=0&prntGrpNo=1
// 星标
// /ips/admin/web/admin/email/offEmailD/getStarEMailList
// ?pageSize=10&pageNumber=1&total=0&prntGrpNo=1
// 收件箱
// /ips/admin/web/admin/email/offEmailD/getEMailInbox
// ?pageSize=10&pageNumber=1&total=0&prntGrpNo=1
// 草稿箱
// /ips/admin/web/admin/email/offEmailD/getDraft
// ?pageSize=10&pageNumber=1&total=0&prntGrpNo=1
