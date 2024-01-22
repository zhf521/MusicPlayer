<template>
  <div class="container">
    <div class="header">
      <Header />
    </div>
    <div class="aside-main">
      <div class="aside">
        <Aside />
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>
<script setup>
import Aside from '../components/Aside.vue';
import Header from '../components/header.vue';
import Footer from '../components/footer/footer.vue';
</script>
<style scoped lang="less">
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    width: 100%;
    height: 60px;
  }

  .aside-main {
    display: flex;
    width: 100%;
    height: calc(100% - 165px);

    .aside {
      width: 200px;
      height: 100%;
    }

    .main {
      width: calc(100% - 200px);
      height: 100%;
    }
  }

  .footer {
    width: 100%;
    height: 105px;
  }
}
</style>