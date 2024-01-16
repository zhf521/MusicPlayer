<template>
  <div class="container">
    <div class="header">
      <Header />
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>
<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer/Footer.vue';
</script>
<style scoped lang="less">
.container {
  width: 100vw;
  height: 100vh;

  .header {
    width: 100%;
    height: 60px;
  }

  .main {
    width: 100%;
    height: calc(100% - 60px - 105px);
  }

  .footer {
    width: 100%;
    height: 105px;
    border-top: 1px solid var(--el-border-color);
  }
}
</style>