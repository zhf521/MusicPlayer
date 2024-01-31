<template>
  <div class="lyrics-container" ref="lyricsContainerRef">
    <div class="lyrics-list" ref="lyricsListRef">
      <div class="space" ref="spaceRef"></div>
      <div v-for="(lrcItem, index) in lrcLines" :key="index"
        :class="{ 'lyrics-text': true, 'lrcItem-active': index === currentLrcIndex }" @click="jumpToTime(lrcItem.time)">
        <div>{{ lrcItem.text }}</div>
        <div v-show="showTranslate">{{ lrcItem.extendedLyrics[0] }}</div>
      </div>
      <div class="space"></div>
    </div>
  </div>
  <div class="translateButton">
    <TranslateIcon v-show="lrcLines[0] && lrcLines[0].extendedLyrics[0]" theme="outline" size="32"
      @click="toggleShowTranslate" />
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { Translate as TranslateIcon } from '@icon-park/vue-next';

// 引入playerStore中的变量
const playerStore = usePlayerStore();
const { lrcLines, currentLrcIndex } = storeToRefs(playerStore);
const { setCurrentTime } = playerStore;

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
  // console.log('lrcLines更新,lrcLines:', lrcLines.value);
  nextTick(() => {
    getLyricsTextHeightArray();
    // console.log('lrcLines更新,lyricsTextHeightArray:', lyricsTextHeightArray.value);
  });
});

onMounted(() => {
  lyricsContainerRef.value.addEventListener('wheel', () => {
    // console.log('鼠标在滚动');
    isScrolling.value = true;
    clearTimeout(scrollTimer.value);
    scrollTimer.value = setTimeout(() => {
      isScrolling.value = false;
    }, 3000);
  });
});
watch(currentLrcIndex, () => {
  if (!isScrolling.value) {
    setOffset();
  }
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
let isScrolling = ref(false);
let scrollTimer = ref(null);
// 滚动
const setOffset = () => {
  let topHeight = spaceHeight.value;
  for (let i = 0; i < currentLrcIndex.value; i++) {
    topHeight += lyricsTextHeightArray.value[i].height;
  }
  let currentHeight = lyricsTextHeightArray.value[currentLrcIndex.value].height / 2;
  let offset = topHeight + currentHeight - lyricsContainerHeight.value / 2;
  lyricsContainerRef.value.scrollTo({ top: offset, behavior: 'smooth' });
};
// 跳转到对应时间
const jumpToTime = (time) => {
  // console.log('跳转到对应时间：', time);
  setCurrentTime(time / 1000);
};
// 显示翻译
const showTranslate = ref(false);
const toggleShowTranslate = () => {
  showTranslate.value = !showTranslate.value;
};
// 监听翻译显示
watch(showTranslate, () => {
  // console.log('翻译显示,lrcLines:', lrcLines.value);
  nextTick(() => {
    getLyricsTextHeightArray();
    // console.log('lrcLines更新,lyricsTextHeightArray:', lyricsTextHeightArray.value);
  });
});
</script>
<style scoped lang="less">
.lyrics-container {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
  mask-image: linear-gradient(to bottom,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.6) 15%,
      rgba(255, 255, 255, 1) 25%,
      rgba(255, 255, 255, 1) 75%,
      rgba(255, 255, 255, 0.6) 85%,
      rgba(255, 255, 255, 0) 100%);

  &::-webkit-scrollbar {
    display: none;
  }

  .lyrics-list {
    width: 100%;
    height: 100%;

    .space {
      height: 50%;
    }

    .lyrics-text {
      font-size: 24px;
      font-weight: 500;
      color: #000;
      border-radius: 10px;
      padding: 20px;
      cursor: pointer;
      opacity: 0.5;
      transition: all 0.3s ease;

      &:hover {
        background-color: #f5f5f5;
      }

      &.lrcItem-active {
        font-weight: 700;
        opacity: 1;
        transition: all 0.3s ease;
      }
    }
  }
}

.translateButton {
  display: flex;
  flex-direction: row-reverse;
}
</style>