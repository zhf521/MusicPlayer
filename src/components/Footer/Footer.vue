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
  <div :class="{ 'pure': true, 'show': isPure }">
    <Pure />
  </div>
  <div :class="{ 'playlist': true, 'show': showPlaylist }">
    <Playlist />
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '../../stores/player';
import MusicInfoNormal from './MusicInfoNormal.vue';
import PlayerController from './PlayerController.vue';
import PlayerTool from './PlayerTool.vue';
import Pure from './Pure.vue';
import Playlist from './Playlist.vue';

// 引入playerStore中的变量和方法
const playerStore = usePlayerStore();
const { isPure, showPlaylist } = storeToRefs(playerStore);
</script>
<style scoped lang="less">
.normal {
  width: 100%;
  height: 100%;
  border-top: 1px solid var(--el-border-color);
  display: flex;
  background-color: #fff;
  z-index: 9999;
  position: relative;

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
  left: 0;
  top: calc(100vh - 105px);
  width: 100vw;
  height: calc(100vh - 105px);
  z-index: 9998;
  background-color: #fff;
  display: flex;
  transition: top 0.3s ease;

  &.show {
    top: 0;
    transition: top 0.3 ease;
  }
}

.playlist {
  position: fixed;
  top: 0;
  left: 100vw;
  bottom: 105px;
  width: 450px;
  background-color: #fff;
  z-index: 9999;
  box-shadow: var(--box-shadow);
  transition: left 0.3s ease;

  &.show {
    left: calc(100vw - 450px);
    transition: left 0.3s ease;
  }
}
</style>