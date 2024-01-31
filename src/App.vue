<template>
  <router-view />
</template>
<script setup>
import { onMounted } from 'vue';
import { useUserSettingsStore } from './stores/userSettings';
import { useMusicLibraryStore } from './stores/musicLibrary';
import { useHistoryStore } from './stores/history';
import { usePlayerStore } from './stores/player';
import { storeToRefs } from 'pinia';
import { useSongListStore } from './stores/songList';
// 引入userSettingsStore中的函数
const userSettingsStore = useUserSettingsStore();
const { loadUserSettings } = userSettingsStore;
// 引入musicLibraryStore中的函数
const musicLibraryStore = useMusicLibraryStore();
const { loadMusicLibrary } = musicLibraryStore;
// 引入historyStore中的变量和函数
const historyStore = useHistoryStore();
const { history } = storeToRefs(historyStore);
const { loadHistory } = historyStore;
// 引入playerStore中的变量和函数
const playerStore = usePlayerStore();
const { currentPlayMusic } = storeToRefs(playerStore);
const { setPlaylist, setCurrentPlayIndex, loadMusic } = playerStore;
// 引入songListStore中的函数
const songListStore = useSongListStore();
const { loadSongList } = songListStore;

onMounted(async () => {
  // 加载用户配置
  await loadUserSettings();
  // 加载音乐库
  await loadMusicLibrary();
  // 加载历史记录
  await loadHistory();
  let historyHead = history.value[0];
  if (historyHead) {
    // 设置播放列表
    setPlaylist(historyHead.playlist);
    // 设置当前播放索引
    setCurrentPlayIndex(historyHead.index);
    // 加载音乐
    await loadMusic(currentPlayMusic.value);
  } else {
    return;
  }
  // 加载歌单
  await loadSongList();
});
</script>