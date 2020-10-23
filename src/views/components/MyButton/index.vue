<!-- 系统 操作按钮 -->
<!--
  注意： type和icon二选一，不能混合使用
  type:
    蓝色按钮类型: search 查询, submit 提交,save 保存,import 导入, export 导出,print 打印 , sure 确定,audit 审核（初审）, batchAudit 批量审核以及其他 other
    绿色按钮类型: add 新增（新增,添加,新建）
    黄色按钮类型: edit 修改,review 复审
    红色按钮类型: delete 删除, batchDelete 批量删除,cancel 取消,disable 禁用
    白色按钮类型: reset 重置, close 关闭, back 返回,以及默认白色

  icon: 这种基本用于表格操作里面的图标按钮
    edit 修改, maintenance 维护, detail 详情,audit 审核, review 复审, cancelAudit 取消审核, delete 删除,print 打印,export 导出
    cancel 取消,stop 停止,upload 上传, calculate 计算, check 核查, replace 替换 save 保存, submit 提交, exit 退出
    accept 受理, historicalRecord 历史记录, adjust 调整, send 发起/发送, invitation 邀请函, supplement 补充材料
    personnel 人员
-->
<template>
  <el-button
    v-if="!icon"
    v-bind="this.$attrs"
    :type="autoType"
    :title=" title || contentText"
    v-on="$listeners"
  >
    <slot>
      {{ title || contentText }}
    </slot>
  </el-button>

  <el-link
    v-else
    v-bind="this.$attrs"
    class="icon-link"
    :underline="false"
    :type="autoType"
    :title=" title || contentText"
    v-on="$listeners"
  >
    <slot>
      <i v-if="isFontSize" :class="iconName" />
      <svg-icon v-else :icon-class="iconName" />
    </slot>
  </el-link>
</template>

<script>
export default {
  props: {
    type: { // 正常按钮
      type: String,
      default: ''
    },
    icon: {
      type: String, // 图标按钮
      default: ''
    },
    title: { // 提示title
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      contentText: '',
      iconName: '',
      isFontSize: false,
      operationTypeArr: [
        { type: 'search', title: '查询', eleType: 'primary' },
        { type: 'submit', title: '提交', eleType: 'primary' },
        { type: 'save', title: '保存', eleType: 'primary' },
        { type: 'import', title: '导入', eleType: 'primary' },
        { type: 'export', title: '导出', eleType: 'primary' },
        { type: 'sure', title: '确定', eleType: 'primary' },
        { type: 'audit', title: '审核', eleType: 'primary' },
        { type: 'batchAudit', title: '批量审核', eleType: 'primary' },
        { type: 'other', title: '其他', eleType: 'primary' },
        { type: 'add', title: '新增', eleType: 'success' },
        { type: 'edit', title: '修改', eleType: 'warning' },
        { type: 'review', title: '复审', eleType: 'warning' },
        { type: 'delete', title: '删除', eleType: 'danger' },
        { type: 'batchDelete', title: '批量删除', eleType: 'danger' },
        { type: 'cancel', title: '取消', eleType: 'danger' },
        { type: 'disable', title: '禁用', eleType: 'danger' },
        { type: 'print', title: '打印', eleType: 'primary' },
        { type: 'reset', title: '重置', eleType: '' },
        { type: 'close', title: '关闭', eleType: '' },
        { type: 'back', title: '返回', eleType: '' }

      ],
      iconArr: [
        { icon: 'edit', title: '修改', iconSvg: 'el-icon-edit', isFontSize: true, eleType: 'warning' },
        { icon: 'delete', title: '删除', iconSvg: 'el-icon-delete', isFontSize: true, eleType: 'danger' },
        { icon: 'detail', title: '详情', iconSvg: 'el-icon-view', isFontSize: true, eleType: 'primary' },
        { icon: 'upload', title: '上传', iconSvg: 'el-icon-upload2', isFontSize: true, eleType: 'success' },
        { icon: 'preview', title: '预览', iconSvg: 'el-icon-view', isFontSize: true, eleType: 'primary' },
        { icon: 'lookover', title: '查看', iconSvg: 'el-icon-view', isFontSize: true, eleType: 'primary' },
        { icon: 'setting', title: '设置', iconSvg: 'el-icon-setting', isFontSize: true, eleType: 'warning' },
        { icon: 'config', title: '配置', iconSvg: 'el-icon-setting', isFontSize: true, eleType: 'warning' },
        { icon: 'sure', title: '确认', iconSvg: 'el-icon-check', isFontSize: true, eleType: 'success' },
        { icon: 'finished', title: '发布', iconSvg: 'el-icon-finished', isFontSize: true, eleType: 'success' },
        { icon: 'unfinished', title: '取消发布', iconSvg: 'el-icon-circle-close', isFontSize: true, eleType: 'danger' },
        { icon: 'save', title: '保存', iconSvg: 'save', eleType: 'primary' },
        { icon: 'submit', title: '提交', iconSvg: 'submit', eleType: 'primary' },
        { icon: 'maintenance', title: '维护', iconSvg: 'maintenance', eleType: 'warning' },
        { icon: 'audit', title: '审核', iconSvg: 'aduit', eleType: 'primary' },
        { icon: 'review', title: '复审', iconSvg: 'aduit', eleType: 'warning' },
        { icon: 'cancelAudit', title: '取消审核', iconSvg: 'cancelAduit', eleType: 'danger' },
        { icon: 'print', title: '打印', iconSvg: 'el-icon-printer', isFontSize: true, eleType: 'primary' },
        { icon: 'export', title: '导出', iconSvg: 'el-icon-download', isFontSize: true, eleType: 'primary' },
        { icon: 'cancel', title: '取消', iconSvg: 'cancel', eleType: 'danger' },
        { icon: 'stop', title: '停止', iconSvg: 'stop', eleType: 'danger' },
        { icon: 'calculate', title: '计算', iconSvg: 'count', eleType: 'primary' },
        { icon: 'recall', title: '撤回', iconSvg: 'recall', eleType: 'danger' },
        { icon: 'exit', title: '退出', iconSvg: 'exit', eleType: 'danger' },
        { icon: 'check', title: '核查', iconSvg: 'check', eleType: 'warning' },
        { icon: 'replace', title: '替换', iconSvg: 'replace', eleType: 'warning' },
        { icon: 'analysis', title: '分析', iconSvg: 'analysis', eleType: 'warning' },
        { icon: 'apply', title: '申请', iconSvg: 'apply', eleType: 'primary' },
        { icon: 'duizhang', title: '对账', iconSvg: 'duizhang', eleType: 'primary' },
        { icon: 'accept', title: '受理', iconSvg: 'accept', eleType: 'primary' },
        { icon: 'historicalRecord', title: '历史记录', iconSvg: 'historicalRecord', eleType: 'primary' },
        { icon: 'adjust', title: '调整', iconSvg: 'adjust', eleType: 'warning' },
        { icon: 'send', title: '发起/发送', iconSvg: 'send', eleType: 'primary' },
        { icon: 'invitation', title: '邀请函', iconSvg: 'invitation', eleType: 'primary' },
        { icon: 'supplement', title: '补充材料', iconSvg: 'supplement', eleType: 'primary' },
        { icon: 'personnel', title: '人员', iconSvg: 'personnel', eleType: 'primary' }
      ]
    }
  },
  computed: {
    autoType() {
      if (this.type) {
        return this.operationTypeHandle()
      } else if (this.icon) {
        return this.iconTypeHandle()
      } else {
        return ''
      }
    }
  },
  methods: {
    operationTypeHandle() {
      const typeObj = this.operationTypeArr.find(item => this.type === item.type)
      if (typeObj) {
        this.contentText = typeObj.title
        return typeObj.eleType
      } else {
        return this.type
      }
    },
    iconTypeHandle() {
      const iconObj = this.iconArr.find(item => this.icon === item.icon)
      if (iconObj) {
        this.contentText = iconObj.title
        this.iconName = iconObj.iconSvg
        this.isFontSize = iconObj.isFontSize
        return iconObj.eleType
      } else {
        this.contentText = '未知功能图标'
        return this.type
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-link{
  width: 20px;
  height: 20px;
  font-size: 18px!important;
  &+.icon-link{
    margin-left: 5px;
  }
  &.success {
    color: $--color-success !important;
  }

  &.warning {
    color: $--color-warning !important;
  }

  &.danger {
    color: $--color-danger !important;
  }
}
.icon-button{
  padding: 0 !important;
  border: 0;
  color: #fff;
  width: 20px;
  height: 20px;

  &.success {
    background-color: $--color-success !important;
  }

  &.warning {
    background-color: $--color-warning !important;
  }

  &.danger {
    background-color: $--color-danger !important;
  }
}
</style>
