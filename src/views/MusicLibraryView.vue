<template>
  <div v-show="route.meta.showFather">
    <el-empty v-if="musicLibrary.length === 0" description="空空如也~">
      <el-button type="primary" @click="goToAddMusic">点我去添加</el-button>
    </el-empty>
    <div v-else class="music-list">
      <el-button type="primary" size="large" @click="goToAddMusic">添加</el-button>
      <MusicList :list="musicLibrary" />
    </div>
  </div>
  <router-view></router-view>
</template>
<script setup>
import { useMusicLibraryStore } from '@/stores/musicLibrary';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 引入路由和路由器
const route = useRoute();
const router = useRouter();
// 引入musicLibraryStore中的变量和函数
const musicLibraryStore = useMusicLibraryStore();
const { musicLibrary } = storeToRefs(musicLibraryStore);
const { loadMusicLibrary } = musicLibraryStore;

// 组件挂载完执行
onMounted(() => {
  // 加载音乐库
  loadMusicLibrary();
});

// 去添加音乐
const goToAddMusic = () => {
  router.push({ name: 'add-music', params: { filename: '/' } })
}
</script>
<style scoped>
.music-list {
  height: 100%;
}
</style>