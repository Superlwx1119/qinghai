import
PROD_CONFIG
  from '@/utils/server.js'
const ips = PROD_CONFIG.ips
// import fileRequest from '@/utils/fileRequest'
export default {
  // beforeFact: ips + '/admin/web/beforeFact', // 文件管理
  page: ips + '/admin/web/admin/offFileD/page', // 文件管理
  offFileShrPage: ips + '/admin/web/admin/offFileD/offFileShrPage', // 被分享的文件管理
  getFileCollocation: ips + '/admin/web/admin/offFileD/getFileCollocation',
  getUrl: ips + '/admin/web/admin/offFileD/getUrl',
  // upload: process.env.NODE_ENV === 'production' ? ips + '/admin/web/admin/offFileD/upload' : '/admin/web/admin/offFileD/upload', // 文件上传
  upload: ips + '/admin/web/admin/offFileD/upload', // 文件上传
  // upload: 'http://10.196.161.40:8080/ips/admin/web/admin/offFileD/upload', //
  downLoadFile: ips + '/admin/web/admin/offFileD/downLoadFile', // 文件下载
  offFileD: ips + '/admin/web/admin/offFileD', // 文件说明修改
  share: ips + '/admin/web/admin/offFileD/share', // 分享列表查询通讯录
  getGrpByPage: ips + '/admin/web/admin/offFileD/getGrpByPage', // 分享列表查询通讯录组
  getGrpMsgPage: ips + '/admin/web/admin/offFileD/getGrpMsgPage', // 个人通讯录组
  offFileAttr: ips + '/admin/web/admin/offFileD/offFileAttr' // 上传成功后调用接口上传其他参数
}
