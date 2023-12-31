<template>
  <div v-show="route.meta.showFather">
    <el-empty v-if="true" description="空空如也~">
      <el-button type="primary" @click="addMusic">点我去添加</el-button>
    </el-empty>
    <div v-else class="music-list">
      <MusicList />
    </div>
  </div>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

// 引入路由和路由器
const route = useRoute();
const router = useRouter();
// 添加音乐到音乐库
const addMusic = () => {
  router.push({ name: 'add-music', params: { filename: '/' } })
}
</script>
<style scoped>
.music-list {
  height: 100%;
}
</style>