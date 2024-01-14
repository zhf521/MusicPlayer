<template>
  <div class="container">
    <div class="header">
      <a href="/music-library">音乐库</a>
      <a href="/cloud-files/%2F">云端文件</a>
      <a href="/settings">设置</a>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footer">
      <PlayerController />
    </div>
  </div>
  <!-- 音频标签 -->
  <audio ref="audioRef"></audio>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useUserSettingsStore } from './stores/userSettings';
import { useMusicLibraryStore } from './stores/musicLibrary';
import PlayerController from './components/PlayerController.vue';
import { usePlayerControllerStore } from './stores/playerController';
import { useHistoryStore } from './stores/history';
import { storeToRefs } from 'pinia';
// 引入userSettingsStore中的函数
const userSettingsStore = useUserSettingsStore();
const { loadUserSettings } = userSettingsStore;
// 引入musicLibraryStore中的函数
const musicLibraryStore = useMusicLibraryStore();
const { loadMusicLibrary } = musicLibraryStore;
// 引入playerControllerStore中的变量和函数
const playerControllerStore = usePlayerControllerStore();
const { setAudioElement, setPlaylist, setCurrentPlayIndex } = playerControllerStore;
// 引入historyStore中的变量和函数
const historyStore = useHistoryStore();
const { loadHistory } = historyStore;
const { history } = storeToRefs(historyStore);

const audioRef = ref(null);

onMounted(async () => {
  // 加载用户配置
  await loadUserSettings();
  // 加载音乐库
  await loadMusicLibrary();
  // 设置音频标签
  setAudioElement(audioRef.value);
  // 加载历史记录
  await loadHistory();
  let historyTailItem = history.value[history.value.length - 1];
  if (historyTailItem) {
    console.log('加载历史记录');
    setPlaylist(historyTailItem.playlist);
    setCurrentPlayIndex(historyTailItem.index);
  } else {
    // 禁用按钮
    console.log('暂无历史记录');
  }
});
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
    padding: 5px 0;
  }
}
</style>