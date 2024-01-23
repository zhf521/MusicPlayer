<template>
  <div class="normal-container"
    :style="{ backgroundColor: `rgba(${currentMusicTags.mainColor && currentMusicTags.mainColor[0]}, ${currentMusicTags.mainColor && currentMusicTags.mainColor[1]}, ${currentMusicTags.mainColor && currentMusicTags.mainColor[2]}, 0.5)` }">
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
import { usePlayerStore } from '../../stores/player';
import MusicInfoNormal from './MusicInfoNormal.vue';
import PlayerController from './PlayerController.vue';
import PlayerTool from './PlayerTool.vue';
import { storeToRefs } from 'pinia';

// 引入playerStore中的方法
const playerStore = usePlayerStore();
const { currentMusicTags, isPure } = storeToRefs(playerStore);
</script>
<style scoped lang="less">
.normal-container {
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