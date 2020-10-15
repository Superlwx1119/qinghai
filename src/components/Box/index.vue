<template>
  <div class="box">
    <div v-if="boxTitle.length > 0" :class="['box-header', { 'handle': needHandle }]">
      <span class="box-title">{{ boxTitle }}</span>
      <div v-if="needHandle" class="box-tools">
        <slot name="tools" />
      </div>
    </div>
    <div class="box-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Box',
  components: {},
  mixins: [],
  props: {
    needHandle: { type: Boolean, default: false },
    boxTitle: { type: String, default: '' }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped>

</style>
