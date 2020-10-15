<template>
  <!-- 人员信息 -->
  <el-select
    :value="currValue"
    style="width: 100%"
    :disabled="_disabled"
    filterable
    remote
    :remote-method="remoteMethod"
    :loading="loading"
    placeholder="请输入姓名或证件号码"
    @input="handleSelectChange($event)"
  >
    <el-option v-for="(v, i) in options" :key="i" :label="v.name" :value="v.id">
      <span style="float: left">{{ v.name }}</span>
      <span style="float: right;font-size: 13px">{{ v.id }}</span>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'PersonalInfo',
  components: {},
  mixins: [],
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      currValue: this.value,
      options: [
        { name: '张三', id: '430632198703012289' },
        { name: '李四', id: '430642195707252490' },
        { name: '王五', id: '43028219770621331X' },
        { name: '熊大', id: '430282198706213312' },
        { name: '熊二', id: '430282198906215566' }
      ]
    }
  },
  computed: {
    _disabled: function() {
      return this.disabled
    }
  },
  watch: {
    value: function(newValue) {
      this.currValue = newValue
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    remoteMethod(query) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    handleSelectChange(v) {
      const obj = this.options.find(item => {
        return item.id === v
      })
      this.$emit('input', v)
      this.$emit('select', { name: obj.name, id: v })
    }
  }
}
</script>

<style scoped lang="scss"></style>
