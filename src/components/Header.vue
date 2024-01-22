<template>
  <div class="header-container">
    <div class="burger-logo">
      <HamburgerIcon class="hamburger" theme="outline" size="32" />
      <div class="logo"></div>
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
</script>
<style scoped>
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  /* background-color: skyblue; */

  .burger-logo {
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .hamburger {
      margin: 0 25px;
    }

    .logo {
      height: 100%;
      line-height: 100%;
    }
  }
}
</style>