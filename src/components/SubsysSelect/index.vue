<template>
  <div>
    <el-select v-model="subsysId" placeholder="请选择" style="width:100%" clearable @change="changeSys">
      <el-option
        v-for="item in options"
        :key="item.subsysId"
        :label="item.subsysName"
        :value="item.subsysId"
      />
    </el-select>
  </div>
</template>

<script>
import { sysAll } from '@/api/Common/Request'
export default {
  name: '',
  components: {},
  mixins: [],
  props: {
    dataObj: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      options: [],
      subsysId: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getOptions()
  },
  mounted() {},
  methods: {
    // 从父组件获取数据
    assignmentTree(data) {
      this.selectedOptions3 = data
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
    getOptions(data) {
      sysAll({}).then(res => {
        if (res.code === 0) {
          this.options = res.data
          this.$store.commit('CHANGE_SUBSYSLIST', res.data)
        }
      })
    },
    // 选择,数据传到父组件中
    changeSys(value) {
      this.$emit('getSubsys', value)
    },
    // 重置
    reset() {
      this.subsysId = ''
    }
  }
}
</script>

<style scoped lang="scss">
</style>
