<!-- 医保区划-->
<template>
  <el-cascader
    ref="cascaderHandle"
    v-model="selId"
    :props="props"
    :placeholder="placeholder"
    clearable
    separator="/"
    style="width:100%; height: 100%"
    @change="valueChange"
  />
</template>

<script>
import { queryAdmdvs } from '@/api/Common/Request'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Array],
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    const self = this
    return {
      selId: '',
      props: {
        checkStrictly: true,
        lazy: true,
        lazyLoad(node, resolve) {
          self.getAreaForLazyLoad(node, resolve)
        }
      }
    }
  },
  watch: {
    value(newVal) {
      if (newVal) {
        this.selId = newVal
      } else {
        this.selId = ''
      }
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    valueChange(val) {
      this.$emit('change', val)
    },
    getAreaForLazyLoad(node, resolve) {
      console.log(node)
      const { level } = node
      if (level === 0) { // 获取省级数据
        queryAdmdvs({ admdvs: '' }).then(res => {
          const nodes = res.data.map(item => (
            {
              value: item.admdvs,
              label: item.admdvsName,
              leaf: false
            }
          )
          )
          resolve(nodes)
        })
      } else { // 获取市级数据
        queryAdmdvs({ prntAdmdvs: node.data.value }).then(res => {
          if (res.data.length > 0) {
            const nodes = res.data.map(item => (
              {
                value: item.admdvs,
                label: item.admdvsName,
                leaf: false
              }
            )
            )
            resolve(nodes)
          } else {
            resolve()
          }
        })
      }
    }
  }
}
</script>
