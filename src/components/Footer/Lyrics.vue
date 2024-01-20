<template>
  <div class="lyrics-container" ref="lyricsContainerRef">
    <div class="lyrics-list" ref="lyricsListRef">
      <div class="space" ref="spaceRef"></div>
      <div v-for="(lrcItem, index) in lrcLines" :key="index"
        :class="{ 'lyrics-text': true, 'lrcItem-active': index === currentLrcIndex }">
        {{ lrcItem.text }}
      </div>
      <div class="space"></div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '../../stores/player';
import { computed, nextTick, onMounted, onUpdated, ref, watch } from 'vue';

// 引入playerStore中的变量
const playerStore = usePlayerStore();
const { lrcLines, currentLrcIndex, musicCurrentTime } = storeToRefs(playerStore);

// 歌词列表
const lyricsListRef = ref(null);
// 歌词文字高度数组
const lyricsTextHeightArray = ref([]);
// 获取歌词文字高度数组
const getLyricsTextHeightArray = () => {
  const lyricsTextArray = lyricsListRef.value.querySelectorAll('.lyrics-text');
  const array = [];
  for (let i = 0; i < lyricsTextArray.length; i++) {
    array.push({ index: i, height: lyricsTextArray[i].clientHeight });
  }
  lyricsTextHeightArray.value = array;
};
// 监听当前歌词变化
watch(lrcLines, () => {
  // console.log('lrcLines更新', lrcLines.value);
  nextTick(() => {
    getLyricsTextHeightArray();
    console.log('lrcLines更新,lyricsTextHeightArray:', lyricsTextHeightArray.value);
  });
});

// onMounted(() => {
//   nextTick(() => {
//     // setTimeout(() => {
//       getLyricsTextHeightArray();
//       console.log('组件挂载,lyricsTextHeightArray:', lyricsTextHeightArray.value);
//     // }, 100);
//   });
// });
watch(musicCurrentTime, () => {
  setOffset();
});

// 歌词容器
const lyricsContainerRef = ref(null);
// 歌词容器高度
const lyricsContainerHeight = computed(() => {
  return lyricsContainerRef.value ? lyricsContainerRef.value.clientHeight : 0;
});
// 空白区域
const spaceRef = ref(null);
// 空白区域高度
const spaceHeight = computed(() => {
  return spaceRef.value ? spaceRef.value.clientHeight : 0;
});
// 滚动
const setOffset = () => {
  let topHeight = spaceHeight.value;
  for (let i = 0; i < currentLrcIndex.value; i++) {
    topHeight += lyricsTextHeightArray.value[i].height;
  }
  let currentHeight = lyricsTextHeightArray.value[currentLrcIndex.value].height / 2;
  let offset = topHeight + currentHeight - lyricsContainerHeight.value / 2;
  lyricsContainerRef.value.scrollTop = offset;
};
</script>
<style scoped lang="less">
.lyrics-container {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
  // scroll-behavior: smooth;

  &::-webkit-scrollbar {
    // display: none;
  }

  .lyrics-list {
    width: 100%;
    height: 100%;

    .space {
      height: 50%;
    }

    .lyrics-text {
      font-size: 30px;
      font-weight: 500;
      color: #000;
      border-radius: 10px;
      padding: 20px;
      cursor: pointer;

      &:hover {
        background-color: #f5f5f5;
      }

      &.lrcItem-active {
        color: green;
      }
    }
  }
}
</style>