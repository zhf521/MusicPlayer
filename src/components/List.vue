<template>
  <div class="list-container">
    <div class="tab">
      <div :class="{ 'playlist-item': true, 'active': showPlaylist }" @click="setShowPlaylist">播放列表</div>
      <div :class="{ 'history-item': true, 'active': !showPlaylist }" @click="setShowHistoryList">历史记录</div>
    </div>
    <div class="list-content">
      <div class="playlist" v-if="showPlaylist">
        <Playlist />
      </div>
      <div class="history" v-else>
        <HistoryList />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Playlist from './Playlist.vue';
import HistoryList from './HistoryList.vue';

// 是否展示播放列表
const showPlaylist = ref(true);
// 设置展示播放列表
const setShowPlaylist = () => {
  // console.log('show playlist');
  showPlaylist.value = true;
};
// 设置展示历史记录
const setShowHistoryList = () => {
  // console.log('show history list');
  showPlaylist.value = false;
};
</script>
<style scoped lang="less">
.list-container {
  width: 100%;
  height: 100%;
  padding: 10px 10px 0;

  .tab {
    height: 40px;
    display: flex;
    align-items: center;
    background-color: #F2F3F4;
    border-radius: 20px;
    padding: 3px;

    .playlist-item {
      width: 100%;
      height: 100%;
      border-radius: 17px;
      margin-right: 1.5px;
      line-height: 34px;
      text-align: center;
      cursor: pointer;

      &:hover {
        background-color: #E5E6E7;
      }

      &.active {
        background-color: #E5E6E7;
      }
    }

    .history-item {
      width: 100%;
      height: 100%;
      border-radius: 17px;
      margin-left: 1.5px;
      line-height: 34px;
      text-align: center;
      cursor: pointer;

      &:hover {
        background-color: #E5E6E7;
      }

      &.active {
        background-color: #E5E6E7;
      }
    }
  }

  .list-content {
    width: 100%;
    height: calc(100% - 40px);

    .playlist {
      width: 100%;
      height: 100%;
    }

    .history {
      width: 100%;
      height: 100%;
    }
  }
}
</style>