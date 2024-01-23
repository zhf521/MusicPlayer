<template>
  <div class="header-container">
    <div class="logo"></div>
    <div>
      <HamburgerIcon class="hamburger" theme="outline" size="32" @click="toggleAsideShow" />
    </div>
    <div>
      <!-- title -->
    </div>
    <div>
      <!-- tool -->
    </div>
  </div>
</template>
<script setup>
import { HamburgerButton as HamburgerIcon } from '@icon-park/vue-next';
import { useAsideStore } from '../stores/aside';
import { storeToRefs } from 'pinia';
// 引入asideStore中的变量和方法
const asideStore = useAsideStore();
const { showAside } = storeToRefs(asideStore);
const { setShowAside } = asideStore;
// 切换侧边栏显示
const toggleAsideShow = () => {
  setShowAside(!showAside.value);
};
</script>
<style scoped>
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  /* background-color: skyblue; */
  .logo {
    width: 200px;
    height: 100%;
    /* background-color: skyblue; */
  }

  .hamburger {
    margin: 0 10px;
    cursor: pointer;
    display: block;
  }
}
</style>