<template>
  <div class="other">
  </div>
  <MusicListIcon class="icon" theme="outline" size="32" :strokeWidth="3" @click="showPlayList = !showPlayList" />
  <div class="playlist" v-show="showPlayList">
    <PlayList :list="playlist" />
  </div>
</template>
<script setup>
import { MusicList as MusicListIcon } from '@icon-park/vue-next';
import PlayList from './PlayList.vue';
import { ref } from 'vue';
import { usePlayerStore } from '../../stores/player';
import { storeToRefs } from 'pinia';

// 引入playerStore中的变量和函数
const playerStore = usePlayerStore();
const { playlist } = storeToRefs(playerStore);
const showPlayList = ref(false);// 是否显示播放列表
</script>
<style scoped>
.icon {
  cursor: pointer;

  &:hover {
    color: green;
  }
}

.playlist {
  position: absolute;
  top: 60px;
  right: 0;
  bottom: 105px;
  width: 450px;
  background-color: #fff;
  z-index: 999;
  box-shadow: var(--box-shadow);
}
</style>