<template>
  <div class="buttons">
    <SvgIcon className="icon" iconName="icon-prev" title="上一曲" @click="prevMusic" />
    <SvgIcon className="icon" :iconName="(isPlaying === false) ? 'icon-play' : 'icon-pause'"
      :title="(isPlaying === false) ? '播放' : '暂停'" @click="toggleMusicPlay" />
  </div>
</template>
<script setup>
import SvgIcon from '../SvgIcon.vue';
import { usePlayerStore } from '../../stores/player';
import { storeToRefs } from 'pinia';
const playerStore = usePlayerStore();
const { isPlaying } = storeToRefs(playerStore);
const { togglePlay ,prev} = playerStore;

// 切换音乐播放、暂停
const toggleMusicPlay = () => {
  // console.log('切换播放、暂停');
  togglePlay();
};
// 上一曲
const prevMusic = ()=>{
  prev();
}
</script>
<style scoped></style>