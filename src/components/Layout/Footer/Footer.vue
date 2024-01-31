<template>
  <div class="footer-container"
    :style="{ background: !isPure ? '#fff' : `repeating-linear-gradient(to right bottom, ${currentMusicTags.mainColor && currentMusicTags.mainColor[0]}, ${currentMusicTags.mainColor && currentMusicTags.mainColor[1]})` }">
    <div class="music-info">
      <MusicInfoNormal />
    </div>
    <div class="player-controller">
      <PlayerController />
    </div>
    <div class="player-tool">
      <PlayerTool />
    </div>
  </div>
</template>
<script setup>
import { usePlayerStore } from '@/stores/player';
import MusicInfoNormal from './MusicInfoNormal.vue';
import PlayerController from './PlayerController.vue';
import PlayerTool from './PlayerTool.vue';
import { storeToRefs } from 'pinia';

// 引入playerStore中的方法
const playerStore = usePlayerStore();
const { currentMusicTags, isPure } = storeToRefs(playerStore);
</script>
<style scoped lang="less">
.footer-container {
  width: 100%;
  height: 100%;
  display: flex;

  .music-info {
    width: 30%;
    height: 100%;
  }

  .player-controller {
    width: 40%;
    height: 100%;
  }

  .player-tool {
    width: 30%;
    height: 100%;
  }
}
</style>