import
PROD_CONFIG
  from '@/utils/server.js'
const ips = PROD_CONFIG.ips
export default {
  // 组织机构
  units: ips + '/admin/web/secRole/units',
  sysAll: ips + '/admin/web/subsys/sysSubsysD/sysAll', // 查询子系统
  getCurrentUser: ips + '/admin/web/getCurrentUser', // 查询登录信息
  current: ips + '/admin/web/user/current', // current
  admdvs: ips + '/admin/web/admdvs/tree' // 医保区划
}
