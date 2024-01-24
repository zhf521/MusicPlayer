<template>
  <div class="music-info-container">
    <img class="cover" :src="currentMusicTags && currentMusicTags.cover || '/defaultCover.png'" alt="音乐封面"
      @click="openPure">
    <div class="details">
      <div class="title">{{ currentMusicTags && currentMusicTags.title || '欢迎使用！' }}</div>
      <div class="artist">{{ currentMusicTags && currentMusicTags.artist || '嘻嘻嘻' }}</div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '../../stores/player';

// 引入playerStore中的变量和方法
const playerStore = usePlayerStore();
const { currentMusicTags, isPure } = storeToRefs(playerStore);
const { setPure, } = playerStore;

// 打开沉浸模式
const openPure = () => {
  setPure(!isPure.value);
}

</script>
<style scoped lang="less">
.music-info-container {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  display: flex;
  align-items: center;

  .cover {
    width: 64px;
    height: 64px;
    border-radius: 10%;
    object-fit: cover;
  }

  .details {
    margin-left: 10px;

    .title {
      font-size: 18px;
      font-weight: 800;
    }

    .artist {
      font-size: 12px;
      margin-top: 4px;
    }
  }
}
</style>