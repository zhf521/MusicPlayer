<template>
  <el-row :gutter="3" justify="space-evenly" class="player-controller">
    <el-col :span="7">
      <div class="music-details">
        <img class="music-cover" :src="currentMusicInfo ? getMusicCover(currentMusicInfo.picture) : ''" alt="music-cover">
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
        <ProgressBar :cTime="cTime" :dTime="dTime" :playedProgressWidth="playedProgressWidth" />
      </div>
    </el-col>
    <el-col :span="7">
      <div class="playlist">
        <SvgIcon class="icon" iconName="icon-playlist" />
      </div>
    </el-col>
  </el-row>
  <audio ref="playerRef"></audio>
</template>
<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import { usePlayerControllerStore } from '@/stores/playerController';
import { storeToRefs } from 'pinia';
import { getMusicCover } from '@/utils/getMusicCover';

// 引入playerControllerStore中的变量和函数
const playerControllerStore = usePlayerControllerStore();
const { isPlaying, mode, audioElement, currentMusicInfo } = storeToRefs(playerControllerStore);
const { setAudioElement, togglePlay, prev, next, setMode } = playerControllerStore;
// 音乐标签实例
const playerRef = ref(null);
// 播放模式
const playMode = ['list-loop', 'one-loop', 'random'];
// 当前播放时间
const cTime = ref();
// 音乐总时长
const dTime = ref();
// 已播放进度条宽度
const playedProgressWidth = ref();

// 组件挂载完后执行
onMounted(() => {
  // 设置audio元素
  nextTick(() => {
    setAudioElement(playerRef.value);
    // 音频播放完
    audioElement.value.onended = () => {
      if (mode.value === 1) {
        // 单曲循环
        audioElement.value.currentTime = 0; // 重新开始播放当前音频
        audioElement.value.play(); // 继续播放
      } else {
        next();
      }
    }
    // 音频加载完可播放
    audioElement.value.oncanplay = () => {
      // 获取音频时长
      const musicTime = audioElement.value.duration;
      // 计算音频分钟
      const musicMinute = Math.floor(musicTime / 60);
      // 计算音频秒
      const musicSecond = Math.floor(musicTime % 60);
      if (musicMinute < 10 && musicSecond < 10) {
        dTime.value = `0${musicMinute}:0${musicSecond}`;
      } else if (musicMinute < 10) {
        dTime.value = `0${musicMinute}:${musicSecond}`;
      } else if (musicSecond < 10) {
        dTime.value = `${musicMinute}:0${musicSecond}`;
      } else {
        dTime.value = `${musicMinute}:${musicSecond}`;
      }
    }
    // 音频正在播放时
    audioElement.value.ontimeupdate = () => {
      // 获取音频时长
      const musicTime = audioElement.value.duration;
      // 获取已播放的音频时长
      const playedTime = audioElement.value.currentTime;
      // 计算已播放进度条比例宽度
      playedProgressWidth.value = `${(playedTime / musicTime) * 100}%`;
      // 计算已播放的音频分钟
      const musicMinute = Math.floor(playedTime / 60);
      // 计算已播放的音频秒
      const musicSecond = Math.floor(playedTime % 60);
      if (musicMinute < 10 && musicSecond < 10) {
        cTime.value = `0${musicMinute}:0${musicSecond}`;
      } else if (musicMinute < 10) {
        cTime.value = `0${musicMinute}:${musicSecond}`;
      } else if (musicSecond < 10) {
        cTime.value = `${musicMinute}:0${musicSecond}`;
      } else {
        cTime.value = `${musicMinute}:${musicSecond}`;
      }
    }

  })
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
  const playModeTitle = ['列表循环', '单曲循环', '随机播放'];
  return playModeTitle[mode.value];
})
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
  font-weight: 500;
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