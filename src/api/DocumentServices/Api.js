import
PROD_CONFIG
  from '@/utils/server.js'
const ips = PROD_CONFIG.ips
export default {
  // beforeFact: ips + '/admin/web/beforeFact', // 文件管理
  page: ips + '/admin/web/admin/offFileD/page', // 文件管理
  offFileShrPage: ips + '/admin/web/admin/offFileD/offFileShrPage', // 被分享的文件管理
  getFileCollocation: ips + '/admin/web/admin/offFileD/getFileCollocation',
  getUrl: ips + '/admin/web/admin/offFileD/getUrl',
  upload: ips + '/admin/web/admin/offFileD/upload', // 文件上传
  downLoadFile: ips + '/admin/web/admin/offFileD/downLoadFile' // 文件下载
}
