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
  Alllin: ips + '/admin/web/admin/cmsCol/all', // 树状--栏位--查询
  colcont: ips + '/admin/web/admin/cmsCol/colcont', // 栏目编辑-新增父级标题
  cmsCol: ips + '/admin/web/admin/cmsCol/cmsCol', // 提交
  edit: ips + '/admin/web/admin/cmsCol/edit' // 编辑
}
// 20001/ips/admin/web/admin/cmsCol/cmsCol
// /admin/web/admin/cmsCol/page?pageSize=10&pageNumber=1&total=18&rcdNo=202007010509360000056300000000
// /admin/web/admin/cmsCol/page?rcdNo=202007010510270000056500000000&pageNum=1&pageSize=10&total=0
// ips/admin/web/admin/cmsCol/page?pageSize=10&pageNumber=1&total=18&rcdNo=0&colTtl=1&sbmtStas=0&ralStas=0
// /admin/web/admin/cmsCol/colcont
// /admin/web/admin/cmsCol/edit
