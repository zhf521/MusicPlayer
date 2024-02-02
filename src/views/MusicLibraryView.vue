<template>
  <div class="music-library-view-container">
    <div class="empty" v-if="musicLibrary.length === 0">
      空空如也~
      <button @click="goToCloudFiles">
        点击添加音乐
      </button>
    </div>
    <div class="music-library" v-else>
      <MusicList :list="musicLibraryList" @itemDblclick="selectMusicLibraryListPlay" @moreClick="showMore" />
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useMusicLibraryStore } from '@/stores/musicLibrary';
import { storeToRefs } from 'pinia';
import MusicList from '@/components/MusicList.vue';
import { computed } from 'vue';
import { usePlayerStore } from '@/stores/player';
import { useSongListStore } from '@/stores/songList';

// 引入musicLibraryStore中的变量
const musicLibraryStore = useMusicLibraryStore();
const { musicLibrary } = storeToRefs(musicLibraryStore);
// 引入playerStore中的变量和方法
const playerStore = usePlayerStore();
const { currentPlayMusic } = storeToRefs(playerStore);
const { setPlayList, setCurrentPlayIndex, loadMusic, play } = playerStore;
// 引入songListStore中的方法
const songListStore = useSongListStore();
const { addSongsToSongList, saveSongListToLocal } = songListStore;

// 引入路由器
const router = useRouter();
// 去云文件
const goToCloudFiles = () => {
  router.push({ name: 'cloud-files', params: { filename: '/' } });
};
// 音乐库列表
const musicLibraryList = computed(() => {
  return musicLibrary.value.map((item) => {
    return item.filename;
  });
});
// 选择音乐库列表播放
const selectMusicLibraryListPlay = async (index) => {
  // console.log(index);
  if (musicLibrary.value[index] !== currentPlayMusic.value) {
    setPlayList(musicLibraryList.value);
    setCurrentPlayIndex(index);
    await loadMusic(currentPlayMusic.value);
    play();
  } else {
    return;
  }
};
// 展示更多
const showMore = (index) => {
  // console.log('展示更多', index);
  addSongsToSongList([musicLibraryList.value[index]], '123');
  saveSongListToLocal();
};
</script>
<style scoped lang="less">
.music-library-view-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;

  .empty {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
      margin-top: 20px;
      font-size: 17px;
      padding: 10px 20px;
      border: transparent;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
      background-color: skyblue;
      border-radius: 4px;

      &:hover {
        scale: 1.05;
      }

      &:active {
        scale: 0.95;
      }
    }
  }

  .music-library {
    width: 100%;
    height: 100%;
  }
}
</style>