// table expand 拓展
import { deepClone } from '@/utils'

export default {
  props: {
    maxCloumns: { type: Number, default: 10 } // table最大列数， 默认10个，超出则显示在expand里面
  },
  data() {
    return {
      // 可配置表头
      expandItems: []
    }
  },
  computed: {
    isExpand() {
      if (this.haveExpand && this.columns.length > this.maxCloumns && this.maxCloumns < 25) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    getHandleCloumns() {
      // 计算分析自动转入expand内容
      const columns = deepClone(this.columns)
      if (this.isExpand) {
        let tempArr = []
        // eslint-disable-next-line prefer-const
        let expandArr = []
        // 计算不能放入expand里面的属性有多少，如果超过了maxcloumns则直接可以用这个
        columns.forEach(item => {
          if (item.type || item.fixed) {
            tempArr.push(item)
          } else {
            expandArr.push(item)
          }
        })
        if (tempArr.length >= this.maxCloumns) {
          this.columnsNew = tempArr
          this.expandHandleFinishColumns = tempArr
          this.expandItems = this.handleCloumnsToExpandForm(expandArr)
          return false
        }
        // 重新计算，不可放入expand的属性，再加上其他需要房子列表上的，其余的则放入expand
        let tagIndex = tempArr.length
        tempArr = []
        // eslint-disable-next-line prefer-const
        let expandDataArr = []
        columns.forEach((item, index) => {
          if ((item.type || item.fixed) && !item.expand) {
            tempArr.push(item)
          } else if (tagIndex < this.maxCloumns && !item.expand) {
            tempArr.push(item)
            tagIndex++
          } else {
            expandDataArr.push(item)
          }
        })
        this.columnsNew = tempArr
        this.expandHandleFinishColumns = tempArr
        this.expandItems = this.handleCloumnsToExpandForm(expandDataArr)
        // 目前展示除了自定义以外的所以数据
        // this.expandItems = this.handleCloumnsToExpandForm(expandArr)
      } else {
        this.columnsNew = columns
        this.expandHandleFinishColumns = columns
      }
    },
    // 处理cloumns数据，放入table-items
    handleCloumnsToExpandTable(items) {
      var arr = []
      // 调整传入table-item格式，默认保持每行显示3个， 除非item有设置colspan
      let totalSpan = 0
      const max = 6
      let trArr = []
      items.forEach((item, index) => {
        const colspan = item.colspan || 2
        if (totalSpan + colspan > max) {
          totalSpan = 0
          arr.push(JSON.parse(JSON.stringify(trArr)))
          trArr = []
        }
        totalSpan += colspan
        trArr.push(item)
        if (items.length - 1 === index) {
          arr.push(JSON.parse(JSON.stringify(trArr)))
        }
      })
      console.log(arr)
      return arr
    },
    handleCloumnsToExpandForm(items) {
      return items
    }
  }
}
