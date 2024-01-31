<template>
  <div class="song-list-container">
    <div class="list-item" v-for="(item, index) in songList" :key="index">
      <img class="cover">
      <div class="title">{{ item.name }}</div>
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

const songListStore = useSongListStore();
const { songList } = storeToRefs(songListStore);
</script>
<style scoped lang="less">
.song-list-container {
  width: 100%;
  height: 100%;
  overflow: auto;

  .list-item {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    border-radius: 7px;
    padding: 10px;

    &:hover {
      background-color: #F2F3F4;
    }

    .cover {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      object-fit: cover;
    }

    .title {
      margin-left: 10px;
    }

    .more {
      margin-left: auto;
    }
  }
}
</style>