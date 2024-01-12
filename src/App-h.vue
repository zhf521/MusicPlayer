<template>
  <el-container class="container">
    <el-header>
      <el-menu style="height: 7vh;" :default-active="route.path.split('/')[1]" mode="horizontal" @select="handleSelect">
        <img style="height:6vh;" src="./assets/logo.svg" alt="logo" />
        <el-menu-item index="music-library">音乐库</el-menu-item>
        <!-- <el-menu-item index="song-list">歌单</el-menu-item> -->
        <el-menu-item index="settings">设置</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer class="footer">
      <PlayerController />
    </el-footer>
  </el-container>
  <!-- 音频标签 -->
  <audio controls ref="playerRef"></audio>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import PlayerController from '@/components/PlayerController.vue';
import { onMounted, ref } from 'vue';
import { useUserSettingsStore } from '@/stores/userSettings';
import { useHistoryStore } from './stores/history';
import { usePlayerControllerStore } from '@/stores/playerController';
import { useMusicLibraryStore } from '@/stores/musicLibrary';
import { storeToRefs } from 'pinia';

// 引入路由和路由器
const route = useRoute();
const router = useRouter();
// 引入playerControllerStore中的变量和函数
const playerControllerStore = usePlayerControllerStore();
const { setAudioElement, setPlaylist, setCurrentPlayIndex } = playerControllerStore;
// 引入userSettingsStore中的函数
const userSettingsStore = useUserSettingsStore();
const { loadUserSettings } = userSettingsStore;
// 引入historyStore中的变量和函数
const historyStore = useHistoryStore();
const { loadHistory } = historyStore;
const { history } = storeToRefs(historyStore);
// 引入musicLibraryStore中的变量和函数
const musicLibraryStore = useMusicLibraryStore();
const { loadMusicLibrary } = musicLibraryStore;

const playerRef = ref(null);
// 在组件挂载到DOM后执行的操作
onMounted(async () => {
  setAudioElement(playerRef.value);
  // 加载用户配置
  await loadUserSettings();
  // 加载音乐库
  await loadMusicLibrary();
  // 加载历史记录
  await loadHistory();
  let historyTailItem = history.value[history.value.length - 1];
  if (historyTailItem) {
    setPlaylist(historyTailItem.playlist);
    setCurrentPlayIndex(historyTailItem.index);
  }
});

// 菜单选中
const handleSelect = (key) => {
  router.push({ name: key });
};

</script>
<style scoped lang="less">
.container {
  height: 100vh;
  width: 100vw;

  .footer {
    height: 105px;
    width: 100%;
    border-top: 1px solid var(--el-border-color);
    padding: 10px 0;
  }
}
</style>