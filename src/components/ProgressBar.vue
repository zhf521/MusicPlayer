<template>
  <div class="music-progress">
    <!-- 当前时间 -->
    <div>{{ props.cTime || '00:00' }}</div>
    <!-- 进度条 -->
    <div class="bar">
      <div class="progress-bar" ref="progressBarRef">
        <div class="played-progress" ref="playedProgressRef">
          <span class="circle"></span>
        </div>
      </div>
    </div>
    <!-- 总时长-->
    <div>{{ props.dTime || '00:00' }}</div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
// 进度条对象
const progressBarRef = ref(null);
// 已播放进度对象
const playedProgressRef = ref(null);
// 接收的数据
const props = defineProps(['cTime', 'dTime', 'playedProgressWidth']);

// 组件挂载完成后执行
onMounted(() => {
  // 设置已播放进度的初始宽度
  playedProgressRef.value.style.width = 0;
  // 监听宽度变化
  watch(() => props.playedProgressWidth, (newVal) => {
    playedProgressRef.value.style.width = newVal;
  });
})


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
  width: 1vh;
  height: 1vh;
  border-radius: 10%;
  background-color: #000000;
}
</style>