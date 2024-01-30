<template>
  <div class="song-list-container">
    <div class="create">新建歌单列表</div>
    <div class="song-list">
      <SongList />
    </div>
  </div>
</template>
<script setup>
import SongList from '../components/SongList.vue';
</script>
<style scoped lang="less">
.song-list-container {
  width: 100%;
  height: 100%;
  padding: 20px 20px 0;
  background-color: pink;

  .create {
    width: 100%;
    height: 70px;
    border-radius: 7px;
    background-color: green;
  }
}
</style>