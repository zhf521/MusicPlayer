<template>
  <!-- 进度条 -->
  <div class="bar">
    <div class="progress-bar" ref="progressBarRef" @click="handleClick">
      <div class="played-progress" ref="playedProgressRef" @mousedown="handleMouseDown">
      </div>
    </div>
  </div>
</template>
<script setup>
import { usePlayerControllerStore } from '@/stores/playerController.js';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';

// 进度条对象
const progressBarRef = ref(null);
// 已播放进度对象
const playedProgressRef = ref(null);
// 接收的数据
const props = defineProps(['playedProgressWidth']);

// 引入playerControllerStore中的变量
const playerControllerStore = usePlayerControllerStore();
const { audioElement } = playerControllerStore;
const dragCurrentTime = ref(null);
const isDragging = ref(false);
// 组件挂载完成后执行
onMounted(() => {
  // 设置已播放进度的初始宽度
  playedProgressRef.value.style.width = 0;
  // 监听宽度变化
  watch(() => props.playedProgressWidth, (newVal) => {
    // if (!isDragging.value) {
    // 更新已播放进度的样式
    playedProgressRef.value.style.width = newVal;
    // }
  });
});

</script>
<style scoped lang="less">
.bar {
  width: 100%;

  .progress-bar {
    width: 100%;
    height: 5px;
    background-color: #fff;
    cursor: pointer;
    border-radius: 10px;
    // transition: transform 0.3s ease;

    // &:hover {
    //   transform: scale(1.2);
    // }

    .played-progress {
      height: 100%;
      background-color: #000;
      cursor: pointer;
      border-radius: 10px;
    }
  }
}
</style>