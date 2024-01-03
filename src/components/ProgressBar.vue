<template>
  <div class="music-progress">
    <!-- 当前时间 -->
    <div>{{ formatTime(props.cTime) }}</div>
    <!-- 进度条 -->
    <div class="bar">
      <div class="progress-bar" ref="progressBarRef" @click="handleClick">
        <div class="played-progress" ref="playedProgressRef">
          <div class="progress-dot" ref="progressDotRef" @mousedown="handleMouseDown"></div>
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
const progressDotRef = ref(null);
// 组件挂载完成后执行
onMounted(() => {
  // 设置已播放进度的初始宽度
  playedProgressRef.value.style.width = 0;
  // 监听宽度变化
  watch(() => props.playedProgressWidth, (newVal) => {
    // 更新已播放进度的样式
    playedProgressRef.value.style.width = newVal;
    // 更新小圆点的位置，根据已播放进度条的位置计算
    const dotPosition = (parseFloat(newVal) / 100) * progressBarRef.value.offsetWidth - progressDotRef.value.offsetWidth / 2;
    progressDotRef.value.style.transform = `translateX(${dotPosition}px)`;
  });
})

// 处理点击进度条事件
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

// 鼠标按下小圆点
const handleMouseDown = (event) => {
  // 阻止默认行为，比如拖动时选中文字
  event.preventDefault();
  // 在文档上添加鼠标移动和松开事件监听
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
}

// 鼠标移动事件处理函数
const handleMouseMove = (event) => {
  // 获取progressBarRef元素位置
  const progressBar = progressBarRef.value.getBoundingClientRect();
  // 计算新的宽度
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

// 鼠标松开事件处理函数
const handleMouseUp = (event) => {
  // 移除文档上的鼠标移动和松开事件监听
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
}

</script>
<style scoped>
.music-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar {
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background-color: #ccc;
  position: relative;
}

.played-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #f00;
}

.progress-dot {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff;
}
</style>
