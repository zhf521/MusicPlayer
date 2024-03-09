<template>
  <div class="music-pure-container">
    <img class="cover" :src="currentMusicTags && currentMusicTags.cover || '/defaultCover.png'" alt="音乐封面">
    <div class="details">
      <div class="title">
        <Carousel :textContent="currentMusicTags && currentMusicTags.title || '欢迎使用！'" />
      </div>
      <div class="artist">
        <Carousel :textContent="currentMusicTags && currentMusicTags.artist || '嘻嘻嘻'" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import Carousel from '@/components/BaseUI/Carousel.vue';

// 引入playerStore中的变量
const playerStore = usePlayerStore();
const { currentMusicTags } = storeToRefs(playerStore);

</script>
<style scoped lang="less">
.music-pure-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .cover {
    width: 50%;
    border-radius: 10%;
    object-fit: cover;
    align-self: center;
  }

  .details {
    width: 100%;

    .title {
      font-size: 20px;
      font-weight: 800;
    }

    .artist {
      font-size: 16px;
      margin-top: 4px;
    }
  }
}
</style>