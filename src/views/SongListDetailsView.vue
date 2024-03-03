<template>
  <div class="song-list-details-container">
    <MusicList :list="detailsList" :listName="'detailsList'" :isHighlight="(item) => item.filename === currentPlayMusic"
      @itemDblclick="selectDetailsListPlay" />
  </div>
</template>

<script setup>
import MusicList from '@/components/MusicList.vue';
import { computed } from 'vue';
import { useSongListStore } from '@/stores/songList';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { usePlayerStore } from '@/stores/player';

// 引入songListStore中的变量
const songListStore = useSongListStore();
const { songList } = storeToRefs(songListStore);
// 引入playerStore中的变量和方法
const playerStore = usePlayerStore();
const { currentPlayMusic } = storeToRefs(playerStore);
const { setPlayList, setCurrentPlayIndex, loadMusic, play } = playerStore;

const route = useRoute();
// 歌单
const targetSongList = computed(() => {
  const songListName = route.params.name;
  return songList.value.find((item) => item.name === songListName);
});
// 歌单详情列表
const detailsList = computed(() => {
  return targetSongList.value.songs.map((item) => {
    return item;
  });
});
// 选择详情列表播放
const selectDetailsListPlay = async (index) => {
  if (targetSongList.value.songs[index] !== currentPlayMusic.value) {
    setPlayList(targetSongList.value.songs);
    setCurrentPlayIndex(index);
    await loadMusic(currentPlayMusic.value);
    play();
  } else {
    return;
  }
};
</script>

<style scoped lang="less">
.song-list-details-container {
  width: 100%;
  height: 100%;
  padding: 20px 20px 0;

  .song-list-info {
    display: flex;

    .cover {
      width: 200px;
      height: 200px;
      border-radius: 20px;
    }
  }

  .song-list {
    width: 100%;
    height: 100%;
    // background-color: pink;
  }
}
</style>