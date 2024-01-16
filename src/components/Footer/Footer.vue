<template>
  <div class="normal">
    <div class="music-info">
      <MusicInfo />
    </div>
    <div class="player-controller">
      <PlayerController />
    </div>
    <div class="player-tool">
      <PlayerTool />
    </div>
  </div>
  <div class="immersion" v-show="false">沉浸模式</div>
</template>
<script setup>
import MusicInfo from './MusicInfo.vue';
import PlayerController from './PlayerController.vue';
import PlayerTool from './PlayerTool.vue';
</script>
<style scoped lang="less">
.normal {
  height: 100%;
  width: 100%;
  display: flex;

  .music-info {
    display: flex;
    align-items: center;
    width: 30%;
    padding: 0 10px;
  }

  .player-controller {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .player-tool {
    width: 30%;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.immersion {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
}
</style>