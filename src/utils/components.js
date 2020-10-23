// 注册全局组件
import Pagination from '@/components/Pagination/default' // ComponentA
import Box from '@/components/Box/index' // 布局box
import List from '@/components/list/default'
import ExpandList from '@/components/list/ExpandList'
import SearchTable from '@/components/SearchList/SearchTable'
import FormDialog from '@/components/dialog/formDialog'
import RightDetailInfo from '@/components/RightDetailInfo/index'
import LeftSearchTable from '@/components/SearchList/LeftSearchTable'

// import ListDialog from '@/components/dialog/formDialog'
import ConditionHeader from '@/components/ConditionHeader'
import Audit from '@/components/Audit/Audit' //  审核弹窗
import AuditDialog from '@/views/components/AuditDialog/index' //  审核弹窗
import MyTableView from '@/components/list/myTableView/index' //  表格组件
import FormItems from '@/views/components/PageLayers/form-items' // 表单组件
import MyButton from '@/views/components/MyButton' // 操作按钮
import StateTag from '@/views/components/StateTag' // 表格状态标签
import NormalLayer from '@/views/components/PageLayers/normalLayer' // 默认页面布局组件
import ExportButton from '@/views/components/ExportButton' //  导出
import FormDrawer from '@/components/Drawer'// 抽屉

export default (Vue) => {
  Vue.component('Pagination', Pagination)
  Vue.component('Box', Box)
  Vue.component('List', List)
  Vue.component('ExpandList', ExpandList)
  Vue.component('SearchTable', SearchTable)
  Vue.component('FormDialog', FormDialog)
  Vue.component('RightDetailInfo', RightDetailInfo)
  Vue.component('LeftSearchTable', LeftSearchTable)
  Vue.component('ConditionHeader', ConditionHeader)
  Vue.component('Audit', Audit)
  Vue.component('AuditDialog', AuditDialog)
  Vue.component('MyTableView', MyTableView)
  Vue.component('FormItems', FormItems)
  Vue.component('MyButton', MyButton)
  Vue.component('StateTag', StateTag)
  Vue.component('ExportButton', ExportButton)
  Vue.component('NormalLayer', NormalLayer)
  Vue.component('FormDrawer', FormDrawer)
}
