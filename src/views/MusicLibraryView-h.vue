<template>
  <el-empty v-if="musicLibrary.length === 0" description="空空如也~">
    <el-button type="primary" @click="goToCloudFiles">点我去云文件添加</el-button>
  </el-empty>
  <div v-else class="music-list">
    <MusicList :list="musicLibrary" />
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useMusicLibraryStore } from '../stores/musicLibrary.js';
import { storeToRefs } from 'pinia';
import MusicList from '../components/MusicList.vue.js';

// 引入musicLibraryStore中的变量和函数
const musicLibraryStore = useMusicLibraryStore();
const { musicLibrary } = storeToRefs(musicLibraryStore);

// 跳转到云端文件
const router = useRouter();
const goToCloudFiles = () => {
  router.push({ name: 'cloud-files', params: { filename: '/' } });
};
</script>
<style scoped>
.music-list {
  height: 100%;
  width: 100%;
}
</style>