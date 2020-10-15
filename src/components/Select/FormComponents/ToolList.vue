<template>
  <el-dropdown>
    <el-button type="primary">
      {{ menuName }}<i class="el-icon-arrow-down el-icon--right" />
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <slot name="toolList" />
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  props: {
    menuName: {
      type: String,
      default: '操作'
    }
  }
}
</script>
