import
PROD_CONFIG
  from '@/utils/server.js'
const ips = PROD_CONFIG.ips
export default {
  // 邮件管理
  queryMail: ips + '/admin/web/admin/email/offEmailD/getEMailInbox', // 邮件查询
  getUnReadCount: ips + 'admin/web/admin/email/offEmailD/getUnReadCount'
}
