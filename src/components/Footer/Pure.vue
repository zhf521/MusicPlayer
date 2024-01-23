<template>
  <div class="pure-container">
    <div class="left-space">
      <DownIcon class="icon" theme="outline" size="32" @click="closePure" />
    </div>
    <div class="music-info">
      <MusicInfoPure />
    </div>
    <div class="lyrics">
      <Lyrics />
    </div>
    <div class="right-space"></div>
  </div>
</template>
<script setup>
import { Down as DownIcon } from '@icon-park/vue-next';
import { usePlayerStore } from '../../stores/player';
import MusicInfoPure from './MusicInfoPure.vue';
import Lyrics from './Lyrics.vue';

// 引入playerStore中的方法
const playerStore = usePlayerStore();
const { setPure } = playerStore;
// 关闭纯净模式
const closePure = () => {
  setPure(false);
};
</script>
<style scoped lang="less">
.pure-container {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #fff;

  .left-space {
    width: 10%;
    height: 100%;
    display: flex;

    .icon {
      margin-top: 30px;
      margin-left: 26px;
      cursor: pointer;

      &:hover {
        color: green;
      }
    }
  }

  .music-info {
    width: 40%;
    height: 100%;
  }

  .lyrics {
    width: 40%;
    margin: 50px 0;
  }

  .right-space {
    width: 10%;
  }
}
</style>