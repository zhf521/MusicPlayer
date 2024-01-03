<template>
  <div class="music-progress">
    <!-- 当前时间 -->
    <div>{{ formatTime(props.cTime) }}</div>
    <!-- 进度条 -->
    <div class="bar">
      <div class="progress-bar" ref="progressBarRef" @click="handleClick">
        <div class="played-progress" ref="playedProgressRef">
          <span class="circle" ref="circleRef"></span>
        </div>
      </div>
    </div>
    <!-- 总时长-->
    <div>{{ formatTime(props.dTime) }}</div>
  </div>
</template>
<script setup lang="ts">
import { usePlayerControllerStore } from '@/stores/playerController';
import { formatTime } from '@/utils/formatTime';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
// 进度条对象
const progressBarRef = ref(null);
// 已播放进度对象
const playedProgressRef = ref(null);
// 接收的数据
const props = defineProps(['cTime', 'dTime', 'playedProgressWidth']);

// 引入playerControllerStore中的变量
const playerControllerStore = usePlayerControllerStore();
const { audioElement } = storeToRefs(playerControllerStore);

// 组件挂载完成后执行
onMounted(() => {
  // 设置已播放进度的初始宽度
  playedProgressRef.value.style.width = 0;
  // 监听宽度变化
  watch(() => props.playedProgressWidth, (newVal) => {
    // 更新已播放进度的样式
    playedProgressRef.value.style.width = newVal;
  });
})

// 处理点击事件
const handleClick = (event) => {
  // 获取progressBarRef元素位置
  const progressBar = progressBarRef.value.getBoundingClientRect();
  // playedProgressRef新的宽度
  const newWidth = `${(event.clientX - progressBar.left) / progressBar.width * 100}%`;
  // 更新已播放进度的样式
  playedProgressRef.value.style.width = newWidth;
  // 总时间
  const totalTime = props.dTime;
  // 当前点击对应的时间
  const currentTime = totalTime * (event.clientX - progressBar.left) / progressBar.width;
  // 为audio设置播放当前时间
  audioElement.value.currentTime = currentTime;
}

</script>
<style scoped>
.music-progress {
  display: flex;
  align-items: center;
}

.bar {
  width: 80%;
  height: 0.5vh;
  margin: 0 5px;
}

.progress-bar {
  width: 100%;
  background-color: #dddddd;
}

.played-progress {
  height: 0.5vh;
  background-color: #000000;
}

.circle {
  width: 2vh;
  height: 2vh;
  border-radius: 10%;
  background-color: #000000;
}
</style>