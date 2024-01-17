<template>
  <Component class="music-volume" :is="VolumeSmall" theme="outline" size="24" fill="#333" :strokeWidth="4" />
  <SliderBar />
  <MusicList class="music-list" theme="outline" size="32" fill="#333" :strokeWidth="3" />
</template>
<script setup>
import { VolumeSmall, MusicList } from '@icon-park/vue-next';
import SliderBar from '../SliderBar.vue';
</script>
<style scoped>
.music-volume {
  /* margin-left: 50%; */
}
</style>