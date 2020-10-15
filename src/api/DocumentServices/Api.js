import
PROD_CONFIG
  from '@/utils/server.js'
const ips = PROD_CONFIG.ips
export default {
  beforeFact: ips + '/admin/web/beforeFact', // 文件管理
  getFileCollocation: ips + '/admin/web/admin/offFileD/getFileCollocation',
  getUrl: ips + '/admin/web/admin/offFileD/getUrl'
}
