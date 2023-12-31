<template>
  <el-container style="height: 100vh;width: 100vw; ">
    <el-header>
      <el-menu style="height: 7vh;" :default-active="route.path.split('/')[1]" mode="horizontal" @select="handleSelect">
        <img style="height:6vh;" src="./assets/logo.svg" alt="logo" />
        <el-menu-item index="music-library">音乐库</el-menu-item>
        <el-menu-item index="song-list">歌单</el-menu-item>
        <el-menu-item index="setting">设置</el-menu-item>
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
import { onMounted } from 'vue';
import { useUserSettingStore } from '@/stores/userSetting';
// 引入路由和路由器
const route = useRoute();
const router = useRouter();
// 引入userSettingStore中的函数
const userSettingStore = useUserSettingStore();
const { loadUserSetting } = userSettingStore;
// 菜单选中
const handleSelect = (key: string) => {
  router.push({ name: key });
}

// 组件挂载成功后执行
onMounted(async () => {
  // 加载用户配置
  await loadUserSetting();
});

</script>
<style scoped></style>