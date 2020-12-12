
// 合计 数据计算
export default {
  data() {
    return {
      summaries_allCloumns: []
    }
  },
  methods: {
    // 拆分所有的多级目录，分解合并成一级
    getAllCloumns() {
      this.summaries_allCloumns = []
      this.columns.forEach(item => {
        if (item.type === 'multistage') {
          this.summaries_allCloumns.push(...item.childColumns)
        } else {
          this.summaries_allCloumns.push(item)
        }
      })
    },
    // 查看原数据是否需要支持合计
    summaries_isShowSummary(item) {
      const cloumnsObj = this.summaries_allCloumns.find(obj => (item.property === obj.prop && item.label === obj.label))
      const tempObj = {
        showSummary: false,
        toFixed: 2
      }
      if (cloumnsObj) {
        tempObj.showSummary = cloumnsObj.showSummary || false
        tempObj.toFixed = cloumnsObj.toFixed === 0 ? 0 : cloumnsObj.toFixed || 2
      }
      return tempObj
    },
    // 合并计算
    getSummariesData(params) {
      const { columns, data } = params
      const sums = []
      columns.forEach((item, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const properyObj = this.summaries_isShowSummary(item)
        if (properyObj.showSummary) {
          const values = data.map(dateObj => Number(dateObj[item.property]))
          // 通过columns中的showSummary
          if (!values.every(value => isNaN(value))) {
            const num = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] = num.toFixed(properyObj.toFixed)
          }
        } else {
          sums[index] = ''
        }
      })
      return sums
    }
  }
}
