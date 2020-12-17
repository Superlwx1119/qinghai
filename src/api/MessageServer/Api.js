import
PROD_CONFIG
  from '@/utils/server.js'
const ips = PROD_CONFIG.ips
export default {
  getAddrBookByPage: ips + '/admin/web/admin/offSmsD/getAddrBookByPage', // 短信接收人信息表---通讯录
  getGrpMsgPage: ips + '/admin/offSmsD/getGrpMsgPage', // 短信接收人信息表---通讯录组详情
  getGrpByPage: ips + '/admin/web/admin/offSmsD/getGrpByPage', // 短信接收人信息表---通讯录组
  page: ips + '/admin/web/admin/offMsgD/page',
  offMsgD: ips + '/admin/web/admin/offMsgD', // 发送消息
  reply: ips + '/admin/web/admin/offMsgD/reply', // 回复
  outBox: ips + '/admin/web/admin/offMsgD/outBox', // 发件箱
  share: ips + '/admin/web/admin/offMsgD/share',
  addSms: ips + '/admin/web/admin/offSmsD/addSms', // 短信信息列表-保存
  getSmsApprByPage: ips + '/admin/web/admin/offSmsD/getSmsApprByPage', // 消息审批
  getUnReadMsg: ips + '/admin/web/admin/offMsgD/getUnReadMsg', // 消息审批
  mkread: ips + '/admin/web/admin/offMsgD/mkread', // 标记已读
  queryRecerName: ips + '/admin/web/admin/offMsgD/queryRecerName', // 发件箱详情的收件人
  deleteInterMailBySender: ips + '/admin/web/admin/offMsgD/deleteInterMailBySender', // 删除发件箱详情的数据
  deleteInterMailByReceiver: ips + '/admin/web/admin/offMsgD/deleteInterMailByReceiver' // 删除收件箱的数据
}
