<template>
  <!-- 音频标签 -->
  <audio ref="playerRef"></audio>
  <!-- 播放控制器 -->
  <el-row :gutter="3" justify="space-evenly" class="player-controller">
    <el-col :span="7">
      <div class="music-details">
        <img class="controller-music-cover" :src="currentMusicInfo ? getMusicCover(currentMusicInfo.picture) : ''"
          alt="音乐封面" @click="openImmersion">
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
  <!-- 沉浸模式 -->
  <div class="immersion-view" v-show="isImmersion">
    <div class="immersion">
      <!-- 左侧空白 -->
      <div class="space"></div>
      <!-- 音乐信息 -->
      <div class="music">
        <img class="music-cover" :src="currentMusicInfo ? getMusicCover(currentMusicInfo.picture) : ''" alt="音乐封面">
        <div class="music-info">
          <div class="music-title">{{ currentMusicInfo && currentMusicInfo.title || '标题' }}</div>
          <div class="music-artist">{{ currentMusicInfo && currentMusicInfo.artist || '艺术家' }}</div>
        </div>
        <div class="music-controller">
          <SvgIcon className="button" :iconName="modeIconName" :title="modeIconTitle" @click="changePlayMode" />
          <SvgIcon className="button" iconName="icon-prev" title="上一曲" @click="prevMusic"></SvgIcon>
          <SvgIcon className="button" :iconName="(isPlaying === false) ? 'icon-play' : 'icon-pause'"
            :title="(isPlaying === false) ? '播放' : '暂停'" @click="toggleMusicPlay"></SvgIcon>
          <SvgIcon className="button" iconName="icon-next" title="下一曲" @click="nextMusic"></SvgIcon>
          <SvgIcon className="button" iconName="icon-playlist"></SvgIcon>
        </div>
        <div class="progress">
          <ProgressBar :cTime="cTime" :dTime="dTime" :playedProgressWidth="playedProgressWidth" />
        </div>
      </div>
      <!-- 滚动歌词和播放列表 -->
      <div class="lyric-or-playlist">
        <div class="lrc-container" ref="containerRef">
          <div class="lrc-list" ref="listRef">
            <div v-for="(lyric, index) in formatLyric(currentMusicInfo?.lyrics.lyrics)" :key="index"
              :class="{ 'active': index === currentIndex }">
              {{ lyric.word }}
            </div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <SvgIcon iconName="icon-close" className="button" @click="closeImmersion" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import { usePlayerControllerStore } from '@/stores/playerController.js';
import { storeToRefs } from 'pinia';
import { getMusicCover } from '@/utils/getMusicCover.js';
import ProgressBar from '@/components/ProgressBar.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { formatLyric } from '@/utils/formatLyric.js';

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

const containerRef = ref(null);
const listRef = ref(null);
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
      // 滚动歌词
      setOffset();
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
const closeImmersion = () => {
  isImmersion.value = false;
};
const currentIndex = ref(0);

// 根据当前音频播放时间，获得需要高亮的歌词index
const findIndex = (lrcArr) => {
  let index = lrcArr.findIndex((item) => item.time > cTime.value);
  if (index === -1) {
    index = lrcArr.length;
  }
  return index - 1;
};

// 设置offset
const setOffset = () => {
  currentIndex.value = findIndex(formatLyric(currentMusicInfo.value.lyrics.lyrics));
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

.controller-music-cover {
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

.immersion-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 9999;
}

.immersion {
  display: flex;
  justify-content: space-between;
}

.space {
  width: 15vw;
  height: 100vh;
}

.music {
  width: 35vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.music-cover {
  width: 20vw;
  height: 20vw;
  margin-bottom: 5vw;
  border-radius: 10%;
  object-fit: cover;
  box-shadow: var(--el-box-shadow);
}

.music-info {
  height: 100px;
  width: 100%;
  padding: 10px 20px;
}

.music-title {
  font-size: 30px;
  font-weight: 600;
}

.music-artist {
  margin-top: 10px;
}

.music-controller {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 60px;
}

.progress {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}

.lyric-or-playlist {
  width: 40vw;
  height: 100vh;
}

.buttons {
  width: 10vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button {
  height: 30px;
  width: 30px;
  margin: 20px 0;
  transition: transform 0.3s ease;
}

.button:hover {
  transform: scale(1.2);
}

.lrc-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.lrc-list {
  transition: 0.1s;
}

.lrc-list div {
  width: 100%;
  padding: 10px;
  word-wrap: break-word;
  text-align: center;
  transition: 0.1s;
}

.lrc-list div.active {
  transform: scale(1.5);
  color: greenyellow;
}
</style>