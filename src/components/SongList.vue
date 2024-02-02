<template>
  <div class="song-list-container">
    <div class="song-list-item" v-for="(item, index) in songList" :key="index" @click="handleClick(item)">
      <div class="music-info">
        <img class="cover" src="/defaultCover.png" alt="歌单封面">
        <div class="title">学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习学习</div>
      </div>
      <div class="more">
        <MoreIcon theme="outline" size="32" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { MoreOne as MoreIcon } from '@icon-park/vue-next';
import { useSongListStore } from '../stores/songList';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const songListStore = useSongListStore();
const { songList } = storeToRefs(songListStore);
const router = useRouter();
const handleClick = (item) => {
  // console.log(item);
  router.push({ name: 'song-list-details', params: { name: item.name } });
};
</script>
<style scoped lang="less">
.song-list-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;

  .song-list-item {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    border-radius: 7px;
    padding: 10px;

    &:hover {
      background-color: #F2F3F4;
    }

    .music-info {
      .cover {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        object-fit: cover;
      }

      .title {
        margin-left: 10px;
      }
    }

    .more {
      margin-left: auto;
    }
  }
}
</style>