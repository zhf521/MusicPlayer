<template>
  <div class="other">
  </div>
  <MusicListIcon class="icon" theme="outline" size="32" :strokeWidth="3" />
</template>
<script setup>
import { MusicList as MusicListIcon } from '@icon-park/vue-next';
</script>
<style scoped>
.icon {
  cursor: pointer;

  &:hover {
    color: green;
  }
}
</style>