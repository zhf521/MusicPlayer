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
      控制器
    </div>
  </div>
  <!-- 音频标签 -->
  <audio ref="audioRef"></audio>
</template>
<script setup>
import { onMounted } from 'vue';
import { useUserSettingsStore } from './stores/userSettings';
import { useMusicLibraryStore } from './stores/musicLibrary';
// 引入userSettingsStore中的函数
const userSettingsStore = useUserSettingsStore();
const { loadUserSettings } = userSettingsStore;
// 引入musicLibraryStore中的函数
const musicLibraryStore = useMusicLibraryStore();
const { loadMusicLibrary } = musicLibraryStore;
onMounted(async () => {
  // 加载用户配置
  await loadUserSettings();
  // 加载音乐库
  await loadMusicLibrary();
});
</script>
<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;

  .header {
    height: 60px;
    width: 100%;
  }

  .main {
    flex: 1;
  }

  .footer {
    height: 105px;
    width: 100%;
    border-top: 1px solid var(--el-border-color);
    padding: 10px 0;
  }
}
</style>