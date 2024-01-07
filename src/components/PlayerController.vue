<template>
  <el-row :gutter="3" justify="space-evenly" class="player-controller">
    <el-col :span="7">
      <div class="music-details">
        <img class="music-cover" :src="currentMusicInfo ? getMusicCover(currentMusicInfo.picture) : ''" alt="音乐封面"
          @click="openImmersion">
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
      <div>
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
  <div class="immersion-view" v-show="isImmersion">
    <Immersion @handleCloseImmersion="closeImmersion" />
  </div>
</template>
<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import { usePlayerControllerStore } from '@/stores/playerController.js';
import { storeToRefs } from 'pinia';
import { getMusicCover } from '@/utils/getMusicCover.js';
import ProgressBar from '@/components/ProgressBar.vue';
import Immersion from '@/components/Immersion.vue';

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
// immersion是否开启
const isImmersion = ref(false);

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
    };
    // 音频加载完可播放
    audioElement.value.oncanplay = () => {
      // 获取音频时长
      dTime.value = audioElement.value.duration;
    };
    // 音频正在播放时
    audioElement.value.ontimeupdate = () => {
      // 获取音频时长
      const musicTime = audioElement.value.duration;
      // 获取当前播放的时间
      cTime.value = audioElement.value.currentTime;
      // 计算已播放进度条比例宽度
      playedProgressWidth.value = `${(cTime.value / musicTime) * 100}%`;
    };
  });
});

// 切换播放、暂停
const toggleMusicPlay = () => {
  togglePlay();
};
// 上一曲
const prevMusic = () => {
  prev();
};
// 下一曲
const nextMusic = () => {
  next();
};
// 切换播放模式
const changePlayMode = () => {
  const newMode = (mode.value + 1) % 3;
  setMode(newMode);
};
// 播放模式iconName
const modeIconName = computed(() => {
  return `icon-${playMode[mode.value]}`;
});
// 播放模式title
const modeIconTitle = computed(() => {
  const playModeTitle = ['列表循环', '单曲循环', '随机播放'];
  return playModeTitle[mode.value];
});
// 开启沉浸模式
const openImmersion = () => {
  isImmersion.value = true;
};
// 关闭沉浸模式
const closeImmersion = (params) => {
  isImmersion.value = params;
};
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

.music-cover:hover {}

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

.immersion-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 9999;
}
</style>