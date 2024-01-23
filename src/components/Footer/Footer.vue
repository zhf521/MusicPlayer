<template>
  <div class="footer-container">
    <div class="normal">
      <Normal />
    </div>
    <div :class="{ 'pure': true, 'show': isPure }">
      <Pure />
    </div>
    <div :class="{ 'playlist': true, 'show': showPlaylist }">
      <Playlist :list="playlist" />
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '../../stores/player';
import Normal from './Normal.vue';
import Pure from './Pure.vue';
import Playlist from './Playlist.vue';

// 引入playerStore中的变量
const playerStore = usePlayerStore();
const { isPure, showPlaylist, playlist, currentMusicTags } = storeToRefs(playerStore);
</script>
<style scoped lang="less">
.footer-container {
  width: 100%;
  height: 100%;
  position: relative;

  .normal {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 99;
    background-color: #fff;
  }

  .pure {
    position: fixed;
    left: 0;
    top: 100vh;
    width: 100vw;
    height: calc(100vh - 105px);
    z-index: 98;
    transition: top 0.3s ease;
    background-color: #fff;

    &.show {
      top: 0;
      transition: top 0.3 ease;
    }
  }

  .playlist {
    position: fixed;
    top: 0;
    left: 100vw;
    width: 450px;
    height: calc(100vh - 105px);
    z-index: 99;
    transition: left 0.3s ease;

    &.show {
      left: calc(100vw - 450px);
      transition: left 0.3s ease;
    }
  }
}
</style>