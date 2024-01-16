<template>
  <el-container>
    <el-header class="flex-vertical-center">
      <Header />
    </el-header>
    <el-container style="height: calc(100vh - 130px);">
      <Aside />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <Footer />
  </el-container>
</template>
<script setup>
import Header from '../components/Header.vue';
import Aside from '../components/Aside.vue';
import Footer from '../components/Footer/Footer.vue';
</script>
<style scoped lang="less"></style>