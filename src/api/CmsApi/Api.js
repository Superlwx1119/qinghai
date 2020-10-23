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
  orgName: ips + '/admin/web/cms/cmsTmplD/orgName', // 编辑模板获取机构名称
  getName: ips + '/admin/web/cms/cmsTmplDAppl/name',
  cmsApplPage: ips + '/admin/web/cms/cmsTmplDAppl/page', // 审批界面查询接口
  cmsAppl: ips + '/admin/web/cms/cmsTmplDAppl/appl', // 提交保存
  applPage: ips + '/admin/web/admin/cmsColContAppl/page', // 审批查询
  cmsColContAppl: ips + '/admin/web/admin/cmsColContAppl', // 内容审批保存
  allselect: ips + '/admin/web/admin/cmsCol/page', //  栏目编辑查询
  Alllin: ips + '/admin/web/admin/cmsCol/all' // 树状--栏位--查询
}

