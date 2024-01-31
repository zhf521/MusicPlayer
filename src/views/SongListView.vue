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
      <div class="input-container">
        <input required type="text" class="input">
        <label class="label">歌单名</label>
      </div>
    </template>
  </Dialog>
</template>
<script setup>
import SongList from '../components/SongList.vue';
import Dialog from '../components/BaseUI/Dialog.vue';
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

.input-container {
  position: relative;
  width: 100%;

  .input {
    width: 100%;
    border: 2px solid black;
    border-radius: 16px;
    background: none;
    padding: 16px;
    font-size: 16px;
    color: black;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

    &:focus,
    &:valid {
      outline: none;
      border: 2px solid #1a73e8;

      ~.label {
        transform: translateY(-200%) scale(0.8);
        background-color: white;
        padding: 0 3px;
        color: #2196f3;
      }
    }
  }

  .label {
    display: block;
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(0, 0, 0, 0.6);
    pointer-events: none;
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>