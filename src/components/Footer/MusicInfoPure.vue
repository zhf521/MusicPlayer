<template>
  <img class="cover" :src="currentMusicTags && currentMusicTags.cover || '/defaultCover.png'" alt="音乐封面">
  <div class="details">
    <div class="title">{{ currentMusicTags && currentMusicTags.title || '欢迎使用！' }}</div>
    <div class="artist">{{ currentMusicTags && currentMusicTags.artist || '嘻嘻嘻' }}</div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '../../stores/player';

// 引入playerStore中的变量
const playerStore = usePlayerStore();
const { currentMusicTags } = storeToRefs(playerStore);

</script>
<style scoped>
.cover {
  width: 50%;
  border-radius: 10%;
  object-fit: cover;
  box-shadow: var(--el-box-shadow);
  align-self: center;
}

.details {
  .title {
    font-size: 20px;
    font-weight: 800;
    text-align: center;
  }

  .artist {
    font-size: 16px;
    margin-top: 4px;
    text-align: center;
  }
}
</style>