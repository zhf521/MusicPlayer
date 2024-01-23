<template>
  <div class="normal-container">
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
import MusicInfoNormal from './MusicInfoNormal.vue';
import PlayerController from './PlayerController.vue';
import PlayerTool from './PlayerTool.vue';
</script>
<style scoped lang="less">
.normal-container {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #fff;

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