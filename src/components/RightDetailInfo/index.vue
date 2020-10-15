<template>
  <!--  右侧详细信息-->
  <section class="layer">
    <div class="box">
      <div :class="handle ? 'box-header handle' : 'box-header'">
        <span class="box-title">{{ title }}</span>
        <div class="box-tools">
          <slot name="tools" />
        </div>
      </div>
      <div class="box-body">
        <div class="detail-info">
          <div class="info-content">
            <div v-for="(item, index) in options" :key="index" class="info-item">
              <span class="item-label">{{ item.label }}</span>
              <span ref="columns" class="item-text">
                <el-tooltip :disabled="item.showTooltip || false" class="item" effect="dark" :content="listData[item.prop]" placement="top">
                  <span ref="_columns">{{ listData[item.prop] }}</span>
                </el-tooltip>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RightDetailInfo',
  components: {
  },
  mixins: [],
  props: {
    title: {
      type: String,
      default: '详情'
    },
    handle: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: () => { return {} }
    },
    listData: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {}
  },
  computed: {
  },
  watch: {},
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.columns.forEach((item, index) => {
        if (item.offsetWidth < (this.$refs._columns[index].offsetWidth + 10)) {
          this.$set(this.options[index], 'showTooltip', false)
          // this.$forceUpdate()
        } else {
          this.$set(this.options[index], 'showTooltip', true)
          // this.$forceUpdate()
        }
      })
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
