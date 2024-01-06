<template>
  <div class="lrc-container" ref="containerRef">
    <div class="lrc-list" ref="listRef">
    </div>
  </div>
</template>
<script setup lang="ts">
import { usePlayerControllerStore } from '@/stores/playerController';
import { formatLyric } from '@/utils/formatLyric';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const containerRef = ref(null);
const listRef = ref(null);
const props = defineProps(['lrc']);
// 引入playerControllerStore中的变量和函数
const playerControllerStore = usePlayerControllerStore();
const { audioElement } = storeToRefs(playerControllerStore);

onMounted(() => {
  createLrcElement();
  if (audioElement.value) {
    audioElement.value.ontimeupdate = () => {
      setOffset();
    }
  }
})

// 根据当前音频播放时间，获得需要高亮的歌词index
const findIndex = (lrcArr) => {
  for (let i = 0; i < lrcArr.length; i++) {
    if (lrcArr[i].time > audioElement.value.currentTime) {
      return i - 1;
    }
  }
  // 如果没有找到，说明已经到歌词的最后一句
  return lrcArr.length - 1;
}

// 创建list中的元素
const createLrcElement = () => {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < formatLyric(props.lrc).length; i++) {
    const listItemDiv = document.createElement('div');
    listItemDiv.textContent = formatLyric(props.lrc)[i].word;
    frag.appendChild(listItemDiv);
  }
  listRef.value.appendChild(frag);
}

// 设置offset
const setOffset = () => {
  const currentIndex = findIndex(formatLyric(props.lrc), props.musicCurrentTime);
  let offset = listRef.value.children[0].clientHeight * currentIndex + listRef.value.children[0].clientHeight / 2 - containerRef.value.clientHeight / 2;

  // 设置最小offset为0
  if (offset < 0) {
    offset = 0;
  }
  // 设置最大offset
  if (offset > listRef.value.clientHeight - containerRef.value.clientHeight) {
    offset = listRef.value.clientHeight - containerRef.value.clientHeight;
  }
  listRef.value.style.transform = `translateY(-${offset}px)`;
  // 设置active之前要清除之前的active
  const active = listRef.value.querySelector('.active');
  if (active) {
    active.classList.remove('active');
  }
  listRef.value.children[currentIndex].classList.add('active');
}

</script>
<style scoped></style>