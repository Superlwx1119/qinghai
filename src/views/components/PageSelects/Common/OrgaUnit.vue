<template>
  <div>
    <el-cascader
      v-model="selectedOptions3"
      :show-all-levels="false"
      :props="props"
      style="width:100%"
      placeholder="请选择"
      filterable
      clearable
      @change="changeServitem"
    />
  </div>
</template>

<script>
import { unit } from '@/api/Common/Request'
export default {
  name: '',
  components: {},
  mixins: [],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    dataObjservitems: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      isDisabled: false,
      props: {
        value: 'id',
        label: 'name',
        checkStrictly: true,
        disabled: true,
        lazy: true,
        lazyLoad(node, resolve) {
          if (node.level === 0) {
            let arr = []
            unit(-1).then(res => {
              if (res.code === 0) {
                arr = res.data
                //   arr.children = []
                unit(arr[0].id).then(res => {
                  arr[0].children = [...res.data]
                  this.options = arr
                  resolve(arr)
                })
              }
            })
          } else {
            unit(node.data.id).then(res => {
              if (res.code === 0) {
                const arr = res.data
                const nodes = arr
                //   arr.children = []
                resolve(nodes)
              }
            })
          }
        }
      },
      options: [],
      selectedOptions3: []
    }
  },
  computed: {},
  watch: {
    value(newVal) {
      if (newVal) {
        this.selectedOptions3.push(newVal)
      } else {
        this.selectedOptions3 = []
      }
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    //

    // 从父组件获取数据
    assignmentTree(data) {
      this.selectedOptions3.push(data)
    },
    // 查看时将不可编辑属性置为true
    isLook(data) {
      if (data === 'query') {
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
    },
    // 获取级联数据
    getTreeData(data) {
      const params = data
      let arr = []
      unit(params).then(res => {
        if (res.code === 0) {
          arr = res.data
          //   arr.children = []
          unit(arr[0].id).then(res => {
            arr[0].children = [...res.data]
            this.options = arr
          })
        }
      })
    },
    // 选择,数据传到父组件中
    changeServitem(value) {
      this.$emit('change', this.selectedOptions3[this.selectedOptions3.length - 1])
    },
    // 重置
    reset() {
      this.selectedOptions3 = []
    }
  }
}
</script>

<style scoped lang="scss">
</style>
