<template>
  <section class="layer">
    <div class="box">
      <div v-if="showHeader" class="box-header">
        <span class="box-title">{{ title }}</span>
      </div>
      <div class="box-body">
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: '',
  components: {},
  mixins: [],
  props: {
    showHeader: { type: Boolean, default: true },
    title: { type: String, default: '' }
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
  methods: {
  }
}
</script>

<style scoped lang="scss"></style>
