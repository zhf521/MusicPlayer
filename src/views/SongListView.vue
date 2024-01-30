<template>
  <div class="song-list-view-container">
    <div class="create" @click="create">新建歌单</div>
    <div class="song-list">
      <SongList />
    </div>
  </div>
  <Dialog ref="dialogRef" @cancel="cancelCreate" @confirm="confirmCreate">
    <template #header>
      新建歌单
    </template>
    <template #main>
      主要内容
    </template>
  </Dialog>
</template>
<script setup>
import SongList from '../components/SongList.vue';
import Dialog from '../components/Dialog.vue';
import { ref } from 'vue';

// dialog实例
const dialogRef = ref(null);
// 创建歌单
const create = () => {
  // console.log('创建歌单');
  dialogRef.value.openDialog();
};
// 取消创建
const cancelCreate = () => {
  // console.log('取消创建');
};
// 确认创建
const confirmCreate = () => {
  // console.log('确认创建');
};
</script>
<style scoped lang="less">
.song-list-view-container {
  width: 100%;
  height: 100%;
  padding: 20px 20px 0;
  background-color: pink;

  .create {
    width: 100%;
    height: 70px;
    border-radius: 7px;
    background-color: skyblue;
    margin-bottom: 20px;
  }

  .song-list {
    width: 100%;
    height: calc(100% - 90px);
    background-color: yellow;
  }
}
</style>