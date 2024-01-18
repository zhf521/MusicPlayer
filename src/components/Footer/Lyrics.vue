<template>
  <div class="lyrics-container">
    <div class="space"></div>
    <div v-for="(lrcItem, index) in lrcLines" :key="index"
      :class="{ 'lyrics-text': true, 'lrcItem-active': index === currentLrcIndex }">{{ lrcItem.text }}</div>
    <div class="space"></div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '../../stores/player';

// 引入playerStore中的变量
const playerStore = usePlayerStore();
const { lrcLines, currentLrcIndex } = storeToRefs(playerStore);

</script>
<style scoped lang="less">
.lyrics-container {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .space {
    height: 50%;
  }

  .lyrics-text {
    font-size: 30px;
    font-weight: 500;
    text-align: center;
    color: #000;
    border-radius: 10px;
    padding: 20px;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  .lrcItem-active {
    color: green;
  }
}
</style>