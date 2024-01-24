<template>
  <div class="music-library-container">
    <div class="empty" v-if="musicLibrary.length === 0">
      空空如也~
      <button @click="goToCloudFiles">
        点击添加音乐
      </button>
    </div>
    <div class="music-library" v-else>
      <MusicList :musicList="musicLibrary" />
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useMusicLibraryStore } from '../stores/musicLibrary.js';
import { storeToRefs } from 'pinia';
import MusicList from '../components/MusicList.vue';

// 引入musicLibraryStore中的变量
const musicLibraryStore = useMusicLibraryStore();
const { musicLibrary } = storeToRefs(musicLibraryStore);

// 引入路由器
const router = useRouter();
// 去云文件
const goToCloudFiles = () => {
  router.push({ name: 'cloud-files', params: { filename: '/' } });
};
</script>
<style scoped lang="less">
.music-library-container {
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