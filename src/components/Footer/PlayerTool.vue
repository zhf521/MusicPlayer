<template>
  <div class="player-tool-container">
    <div class="other">
    </div>
    <MusicListIcon class="icon" theme="outline" size="32" :strokeWidth="3" @click="toggleShowPlaylist" />
  </div>
</template>
<script setup>
import { MusicList as MusicListIcon } from '@icon-park/vue-next';
import { usePlayerStore } from '../../stores/player';
import { storeToRefs } from 'pinia';

// 引入playerStore中的变量和函数
const playerStore = usePlayerStore();
const { playlist, showPlaylist } = storeToRefs(playerStore);
const { setShowPlaylist } = playerStore;
const toggleShowPlaylist = () => {
  setShowPlaylist(!showPlaylist.value);
};
</script>
<style scoped>
.player-tool-container {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .icon {
    cursor: pointer;

    &:hover {
      color: green;
    }
  }
}
</style>