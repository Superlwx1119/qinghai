<!-- 搜索弹框 -->
<template>
  <normal-layer :search-number="1">
    <div style="text-align: center">
      <el-transfer
        v-model="value"
        style="text-align: left; display: inline-block"
        filterable
        :left-default-checked="[2, 3]"
        :right-default-checked="[1]"
        :render-content="renderFunc"
        :titles="['通讯录列表', '已选接收人列表']"
        :button-texts="['', '']"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }"
        :data="data"
        @change="handleChange"
      />
    </div>
  </normal-layer>
</template>
<script>
import { getGrpByPage } from '@/api/MessageServer/index'
import pageHandle from '@/mixins/pageHandle'
export default {
  components: { },
  mixins: [pageHandle],
  model: {
    prop: 'isDialogVisible',
    event: 'closeAll'
  },
  props: {
    isDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: '短信接收人信息表'
    },
    selection: {
      type: Array,
      default: () => []
    },
    queCont: { // 查询内容（1：机构，2：药店）
      type: String,
      default: ''
    }
  },
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`
          // disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      data: generateData(),
      value: [1],
      value4: [1],
      renderFunc(h, option) {
        return <span>{ option.key } - { option.label }</span>
      },
      loading: false,
      itemsDatas: [
        { label: '搜索', prop: 'addrbookGrpName', type: 'input', message: '请输入', span: 12 }
      ],
      addrbookGrpNo: '',
      queryForm: {
        addrbookGrpName: '',
        content: ''
      },
      multipleSelection: [],
      fileList: [],
      columns: [
        { type: 'index', label: '序号' },
        { label: '个人通讯录组名称', prop: 'addrbookGrpName', width: '120px' },
        { label: '组内成员', prop: 'userNameList' },
        { label: '操作', type: 'operation', fixed: 'right', width: '100px' }
      ],
      detailTitle: '',
      isShowDetail: false,
      paginationQuery: {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
        startRow: 0,
        endRow: 0
      },
      rules: {
        title: [
          { required: true, message: '请输入短信标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入短信内容', trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  computed: {
  },
  watch: {
    multipleSelection(val) {
      this.$emit('changeSelection', val)
    },
    selection(val) {
      this.multipleSelection = val
    }
  },
  created() {
  },

  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
    reset() {},
    isShow(v) {
      this.$emit('closeAll', false)
    },
    resetForm() {
      this.$nextTick(() => {
        this.reset()
        // this.$refs.tableRef.reset()
      })
    },
    search() {
      const form = {
        ...this.paginationQuery,
        addrbookGrpName: this.queryForm.addrbookGrpName
      }
      this.loading = true
      getGrpByPage(form).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.result
          const num1 = res.data.pageSize * (res.data.pageNumber - 1) + 1
          const num2 = res.data.pageSize * res.data.pageNumber > res.data.recordCount ? res.data.recordCount : res.data.pageSize * res.data.pageNumber
          this.paginationQuery = {
            pageSize: res.data.pageSize,
            pageNumber: res.data.pageNumber,
            total: res.data.recordCount,
            startRow: num1,
            endRow: num2
          }
        }
      }).finally(() => { this.loading = false })
    }
  }
}
</script>
<style lang="scss" scoped>
.header-box{
  width: 100%;
  margin-bottom: 10px;
}
i{
  color: rgba(27, 109, 209,1);
}
.transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>
