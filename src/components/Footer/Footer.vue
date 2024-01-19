<template>
  <div class="normal">
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
  <div class="pure">
    <Pure />
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '../../stores/player';
import MusicInfoNormal from './MusicInfoNormal.vue';
import PlayerController from './PlayerController.vue';
import PlayerTool from './PlayerTool.vue';
import Pure from './Pure.vue';

// 引入playerStore中的变量和方法
const playerStore = usePlayerStore();
const { isPure } = storeToRefs(playerStore);
</script>
<style scoped lang="less">
.normal {
  width: 100%;
  height: 100%;
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
    align-items: center;
    justify-content: space-between;
  }
}

.pure {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh - 105px);
  z-index: 9999;
  //  transform:scale(0);
  background-color: #fff;
  display: flex;
}
</style>