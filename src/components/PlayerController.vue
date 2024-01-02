<template>
  <el-row :gutter="3" justify="space-evenly" class="player-controller">
    <el-col :span="7">
      <div class="music-details">
        <img class="music-cover" src="" alt="music-cover">
        <div class="music-info">
          <div class="music-title">{{ currentMusicInfo && currentMusicInfo.title || '标题' }}</div>
          <div class="music-artist">{{ currentMusicInfo && currentMusicInfo.artist || '艺术家' }}</div>
        </div>
      </div>
    </el-col>
    <el-col :span="7">
      <div class="music-btns">
        <SvgIcon class="icon" :iconName="modeIconName" :title="modeIconTitle" @click="changePlayMode" />
        <SvgIcon class="icon" iconName="icon-prev" title="上一曲" @click="prevMusic" />
        <SvgIcon class="icon" :iconName="(isPlaying === false) ? 'icon-play' : 'icon-pause'"
          :title="(isPlaying === false) ? '播放' : '暂停'" @click="toggleMusicPlay" />
        <SvgIcon class="icon" iconName="icon-next" title="下一曲" @click="nextMusic" />
        <SvgIcon class="icon" iconName="icon-volume" />
      </div>
      <div class="progress-bar">
        <!-- <el-slider /> -->
      </div>
    </el-col>
    <el-col :span="7">
      <div class="playlist">
        <SvgIcon class="icon" iconName="icon-playlist" />
      </div>
    </el-col>
  </el-row>
  <audio ref="playerRef" @ended="handleAudioEnd"></audio>
</template>
<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import { usePlayerControllerStore } from '@/stores/playerController';
import { storeToRefs } from 'pinia';
// 引入playerControllerStore中的变量和函数
const playerControllerStore = usePlayerControllerStore();
const { isPlaying, mode, audioElement, currentMusicInfo } = storeToRefs(playerControllerStore);
const { setAudioElement, togglePlay, prev, next, setMode } = playerControllerStore;
// 音乐标签实例
const playerRef = ref(null);
// 播放模式
const playMode = ['list-loop', 'random', 'one-loop'];

// 组件挂载完后执行
onMounted(() => {
  // 设置audio元素
  nextTick(() => {
    setAudioElement(playerRef.value);
  });
})

// 切换播放、暂停
const toggleMusicPlay = () => {
  togglePlay();
}
// 上一曲
const prevMusic = () => {
  prev();
}
// 下一曲
const nextMusic = () => {
  next();
}
// 切换播放模式
const changePlayMode = () => {
  const newMode = (mode.value + 1) % 3;
  setMode(newMode);
}
// 播放模式iconName
const modeIconName = computed(() => {
  return `icon-${playMode[mode.value]}`;
})
// 播放模式title
const modeIconTitle = computed(() => {
  const playModeTitle = ['列表循环', '随机播放', '单曲循环'];
  return playModeTitle[mode.value];
})
// 音频播放完成
const handleAudioEnd = () => {
  if (mode.value === 2) {
    // 单曲循环
    audioElement.value.currentTime = 0; // 重新开始播放当前音频
    audioElement.value.play(); // 继续播放
  } else {
    next();
  }
}
</script>
<style scoped>
.player-controller {
  height: 8vh;
  widows: 100vw;
}

.music-details {
  height: 8vh;
  display: flex;
  align-items: center;
}

.music-cover {
  width: 8vh;
  height: 8vh;
  border-radius: 10%;
  object-fit: cover;
  box-shadow: var(--el-box-shadow);
}

.music-info {
  margin-left: 1vw;
}

.music-title {
  font-size: 3vh;
  font-weight: bold;
}

.music-artist {
  margin-top: 1vh;
  color: #666;
}

.music-btns {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1vh;
}

.icon {
  width: 3vh;
  height: 3vh;
  transition: transform 0.3s ease;
}

.icon:hover {
  transform: scale(1.2);
}

.playlist {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>