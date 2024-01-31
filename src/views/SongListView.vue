<template>
  <div class="song-list-view-container" v-show="$route.meta.showFather">
    <div class="create" @click="create">新建歌单</div>
    <div class="song-list">
      <SongList />
    </div>
    <MyDialog ref="dialogRef">
      <template #header>
        新建歌单
      </template>
      <template #main>
        <div class="input-container">
          <input required type="text" class="input" v-model="inputValue">
          <label class="label">歌单名</label>
        </div>
      </template>
      <template #footer>
        <button @click="cancelCreate">取消</button>
        <button @click="confirmCreate">提交</button>
      </template>
    </MyDialog>
  </div>
  <router-view />
</template>
<script setup>
import SongList from '@/components/SongList.vue';
import MyDialog from '@/components/BaseUI/MyDialog.vue';
import { ref } from 'vue';
import { useSongListStore } from '@/stores/songList';

const songListStore = useSongListStore();
const { createSongList, saveSongListToLocal } = songListStore;

// dialog实例
const dialogRef = ref(null);
// 输入框的值
const inputValue = ref('');
// 创建歌单
const create = () => {
  // console.log('创建歌单');
  dialogRef.value.openDialog();
};
// 取消创建
const cancelCreate = () => {
  // console.log('取消创建');
  inputValue.value = '';
  dialogRef.value.closeDialog();
};
// 确认创建
const confirmCreate = async () => {
  // console.log('确认创建');
  // console.log(inputValue.value);
  try {
    createSongList(inputValue.value.trim());
    await saveSongListToLocal();
    inputValue.value = '';
    dialogRef.value.closeDialog();
  } catch (error) {
    console.log('error', error);
  }
};
</script>
<style scoped lang="less">
.song-list-view-container {
  width: 100%;
  height: 100%;
  padding: 20px 20px 0;

  .create {
    width: 100%;
    height: 70px;
    border-radius: 7px;
    margin-bottom: 20px;
  }

  .song-list {
    width: 100%;
    height: calc(100% - 90px);
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