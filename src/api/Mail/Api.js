import
PROD_CONFIG
  from '@/utils/server.js'
const ips = PROD_CONFIG.ips
export default {
  // 邮件管理
  queryMail: ips + '/admin/web/admin/email/offEmailD/getEMailInbox', // 邮件查询
  getUnReadCount: ips + '/admin/web/admin/email/offEmailD/getUnReadCount',
  getStarEMailList: ips + '/admin/web/admin/email/offEmailD/getStarEMailList', // 星标
  getEMailInbox: ips + '/admin/web/admin/email/offEmailD/getEMailInbox', // 收件箱
  getDraft: ips + '/admin/web/admin/email/offEmailD/getDraft', // 草稿箱
  getEMailOutbox: ips + '/admin/email/offEmailD/getEMailOutbox', // 已发送
  getEMailBin: ips + '/admin/web/admin/email/offEmailD/getEMailBin', // 已取消
  getArchiveEMailList: ips + '/admin/web/admin/email/offEmailD/getArchiveEMailList', // 归档文件
  getGrpByPage: ips + '/admin/web/admin/offMsgD/getGrpByPage', // 通讯录列表
  getGrpMsgPage: ips + 'admin/web/admin/offMsgD/getGrpMsgPage',
  offEmailD: ips + '/admin/web/admin/email/offEmailD', // 发送邮件
  saveDraft: ips + '/admin/web/admin/email/offEmailD/saveDraft',
  addGroup: ips + 'admin/web/admin/email/offEmailD/addGroup' // 添加邮件
}
// 已发送
// /ips/admin/web/admin/email/offEmailD/getEMailOutbox
// ?pageSize=10&pageNumber=1&total=0&prntGrpNo=1

// /ips/admin/web/admin/email/offEmailD/getStarEMailList
// ?pageSize=10&pageNumber=1&total=0&prntGrpNo=1
// 收件箱
// /ips/admin/web/admin/email/offEmailD/getEMailInbox
// ?pageSize=10&pageNumber=1&total=0&prntGrpNo=1
// 草稿箱
// /ips/admin/web/admin/email/offEmailD/getDraft
// ?pageSize=10&pageNumber=1&total=0&prntGrpNo=1
// /ips/admin/web/admin/email/offEmailD/getStarEMailList?
// ips/admin/web/admin/email/offEmailD/getEMailBin?pageSize=10&pageNumber=1&total=0&prntGrpNo=1&emailType=02
// /ips/admin/web/admin/email/offEmailD/getArchiveEMailList?pageSize=10&pageNumber=1&total=0&prntGrpNo=1&emailType=02
// /admin/web/admin/offMsgD/getGrpByPage?pageSize=10&pageNumber=1&total=2&addrbookGrpName=  // 通讯录
// /admin/web/admin/offMsgD/getGrpMsgPage/202008081024470000000101130000?pageSize=10&pageNumber=1&total=10
