<template>
  <div class="lrc-container" ref="containerRef">
    <div class="lrc-list" ref="listRef">
      <div v-for="(lyric, index) in formatLyric(props.lrc)" :key="index" :class="{ 'active': index === currentIndex }">
        {{ lyric.word }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePlayerControllerStore } from '@/stores/playerController.js';
import { formatLyric } from '@/utils/formatLyric.js';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const containerRef = ref(null);
const listRef = ref(null);
const props = defineProps(['lrc']);
// 引入playerControllerStore中的变量和函数
const playerControllerStore = usePlayerControllerStore();
const { audioElement } = storeToRefs(playerControllerStore);
const currentIndex = ref(0);

// 根据当前音频播放时间，获得需要高亮的歌词index
const findIndex = (lrcArr) => {
  for (let i = 0; i < lrcArr.length; i++) {
    if (lrcArr[i].time > audioElement.value.currentTime) {
      return i - 1;
    }
  }
  // 如果没有找到，说明已经到歌词的最后一句
  return lrcArr.length - 1;
};

// 设置offset
const setOffset = () => {
  currentIndex.value = findIndex(formatLyric(props.lrc));
  let offset = listRef.value.children[0].clientHeight * currentIndex.value + listRef.value.children[0].clientHeight / 2 - containerRef.value.clientHeight / 2;

  // 设置最小offset为0
  if (offset < 0) {
    offset = 0;
  }
  // 设置最大offset
  if (offset > listRef.value.clientHeight - containerRef.value.clientHeight) {
    offset = listRef.value.clientHeight - containerRef.value.clientHeight;
  }
  listRef.value.style.transform = `translateY(-${offset}px)`;
};

defineExpose({ setOffset });
</script>
<style scoped>
.lrc-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.lrc-list {
  transition: 0.1s;
}

.lrc-list div {
  text-align: center;
  transition: 0.1s;
}

.lrc-list div.active {
  transform: scale(1.5);
  color: greenyellow;
}
</style>
