<template>
  <router-view />
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
<style scoped></style>