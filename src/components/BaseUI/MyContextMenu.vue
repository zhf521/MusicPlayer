<template>
  <div class="context-menu-container">
    <div class="context-menu">
      <div class="context-menu-item"></div>
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped lang="less">
.context-menu-container {
  position: fixed;
  width: 150px;
  padding: 10px;
  border-radius: 15px;

  .context-menu {
    .context-menu-item {}
  }
}
</style>