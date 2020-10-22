import
PROD_CONFIG
  from '@/utils/server.js'
const ips = PROD_CONFIG.ips
export default {
  // cms
  cmsPage: ips + '/admin/web/cms/cmsTmplD/page', // 标题查询
  // /ips/admin/web/cms/cmsTmplD/page?pageSize=10&pageNumber=1&total=10&tmplTtl=123
  cmstmpl: ips + '/admin/web/cms/cmsTmplD/tmpl', // 提交
  cmsedit: ips + '/admin/web/cms/cmsTmplD/edit', // 编辑
  cmsdel: ips + '/admin/web/cms/cmsTmplD/del',
  cmsadd: ips + '/admin/web/cms/cmsTmplD/add',
  orgName: ips + '/admin/web/cms/cmsTmplD/orgName'
}
