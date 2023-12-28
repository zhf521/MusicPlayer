<template>
  <el-container style="height: 100vh;width: 100vw; overflow: hidden;">
    <el-header>
      <el-menu style="height: 7vh;width: 100vw;" :default-active="route.name" mode="horizontal" @select="handleSelect">
        <img style="height:6vh" src="./assets/logo.svg" alt="logo" />
        <el-menu-item index="music-library">音乐库</el-menu-item>
        <el-menu-item index="song-list">歌单</el-menu-item>
        <el-menu-item index="config">设置</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer style="height: 10vh;width: 100vw; border-top:1px solid var(--el-border-color);padding: 1vh;">
      <PlayerController />
    </el-footer>
  </el-container>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import PlayerController from './components/PlayerController.vue';
// 引入路由和路由器
const route = useRoute();
const router = useRouter();

// 菜单选中
const handleSelect = (key: string) => {
  router.push(key);
}

</script>
<style scoped></style>