<template>
  <div class="music-progress">
    <!-- 当前时间 -->
    <div>{{ props.cTime ? formatTimeToString(props.cTime) : '00:00' }}</div>
    <!-- 进度条 -->
    <div class="bar">
      <div class="progress-bar" ref="progressBarRef" @click="handleClick">
        <div class="played-progress" ref="playedProgressRef" @mousedown="handleMouseDown">
        </div>
      </div>
    </div>
    <!-- 总时长-->
    <div>{{ props.dTime ? formatTimeToString(props.dTime) : '00:00' }}</div>
  </div>
</template>
<script setup>
import { usePlayerControllerStore } from '@/stores/playerController.js';
import { formatTimeToString } from '@/utils/formatTime.js';
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
const dragCurrentTime = ref(null);
const isDragging = ref(false);
// 组件挂载完成后执行
onMounted(() => {
  // 设置已播放进度的初始宽度
  playedProgressRef.value.style.width = 0;
  // 监听宽度变化
  watch(() => props.playedProgressWidth, (newVal) => {
    if (!isDragging.value) {
      // 更新已播放进度的样式
      playedProgressRef.value.style.width = newVal;
    }
  });
});

// 处理点击进度条事件
const handleClick = (event) => {
  // 获取progressBarRef元素位置
  const progressBar = progressBarRef.value.getBoundingClientRect();
  // 总时间
  const totalTime = props.dTime;
  // 当前点击对应的时间
  const currentTime = totalTime * (event.clientX - progressBar.left) / progressBar.width;
  // 为audio设置播放当前时间
  audioElement.value.currentTime = currentTime;
  // 更新已播放进度条的样式
  playedProgressRef.value.style.width = `${(event.clientX - progressBar.left) / progressBar.width * 100}%`;
};

// 鼠标按下已播放进度条
const handleMouseDown = (event) => {
  // 设置正在拖动的标志为true
  isDragging.value = true;
  // 阻止默认行为，比如拖动时选中文字
  event.preventDefault();
  // 在文档上添加鼠标移动和松开事件监听
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
};

// 鼠标移动事件处理函数
const handleMouseMove = (event) => {
  // 获取progressBarRef元素位置
  const progressBar = progressBarRef.value.getBoundingClientRect();
  // 计算新的宽度
  let newWidth = `${(event.clientX - progressBar.left) / progressBar.width * 100}%`;
  // 检查新的宽度是否超出边界
  if (event.clientX < progressBar.left) { // 超出左边界
    newWidth = '0%'; // 将宽度设为0%
  } else if (event.clientX > progressBar.left + progressBar.width) { // 超出右边界
    newWidth = '100%'; // 将宽度设为100%
  }
  // 总时间
  const totalTime = props.dTime;
  // 当前移动对应的时间
  dragCurrentTime.value = totalTime * (event.clientX - progressBar.left) / progressBar.width;
  // 更新已播放进度的样式
  playedProgressRef.value.style.width = newWidth;
};

// 鼠标松开事件处理函数
const handleMouseUp = (event) => {
  // 移除正在拖动的标志
  isDragging.value = false;
  // 移除文档上的鼠标移动和松开事件监听
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
  // 为audio设置播放当前时间
  audioElement.value.currentTime = dragCurrentTime.value;
}

</script>
<style scoped>
.music-progress {
  display: flex;
  align-items: center;
}

.bar {
  width: 100%;
  position: relative;
  margin: 0 10px;
}

.progress-bar {
  width: 100%;
  height: 5px;
  background-color: #ccc;
  cursor: pointer;
  border-radius: 10px;
}

.progress-bar:hover {
  height: 8px;
}

.played-progress {
  height: 100%;
  background-color: #000;
  cursor: pointer;
  border-radius: 10px;
}
</style>
