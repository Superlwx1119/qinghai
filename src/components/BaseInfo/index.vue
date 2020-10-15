<template>
  <div class="base-info">
    <div class="info-content">
      <div v-for="(item, index) in options" :key="index" class="info-item">
        <span class="item-label">{{ item.label + '：' }}</span>
        <span class="item-text">{{ info[item.key] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInfo',
  components: {
  },
  mixins: [],
  props: {
    options: {
      type: Array,
      default: () => { return [] }
    },
    info: {
      type: Object,
      default: () => { return [] }
    }
  },
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .base-info {
    .info-content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      border-left: 1px solid $border;
      border-top: 1px solid $border;

      .info-item {
        width: 33.3333%;
        display: inline-block;
        font-size: 0;
        border-right: 1px solid $border;
        border-bottom: 1px solid $border;

        .item-label {
          display: inline-block;
          vertical-align: middle;
          width: 135px;
          text-align: right;
          font-weight: bold;
          color: #464646;
          padding: 10px;
          background: #eff2f5;
          font-size: 14px;
        }

        .item-text {
          display: inline-block;
          vertical-align: middle;
          text-align: left;
          color: #7F7F7F;
          padding: 10px 0 10px 10px;
          //border: 1px solid #efefef;
          font-size: 14px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: calc(100% - 135px);
        }
      }
    }
  }
</style>
