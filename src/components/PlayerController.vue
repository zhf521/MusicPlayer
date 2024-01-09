<template>
  <!-- 音频标签 -->
  <audio ref="playerRef" @ended="handleAudioEnded" @canplay="handleAudioCanPlay" @timeupdate="handleAudioTimeUpdate"
    @pause="handleAudioPause"></audio>
  <!-- 播放控制器 -->
  <div class="controller">
    <div class="details">
      <img class="music-cover" :src="currentMusicInfo ? getMusicCover(currentMusicInfo.picture) : '/default-cover.jpg'"
        alt="音乐封面" @click="openImmersion">
      <div class="music-info">
        <div class="music-title">{{ currentMusicInfo && currentMusicInfo.title || '标题' }}</div>
        <div class="music-artist">{{ currentMusicInfo && currentMusicInfo.artist || '艺术家' }}</div>
      </div>
    </div>
    <div class="btns-progress">
      <div class="btns">
        <SvgIcon className="icon" :iconName="modeIconName" :title="modeIconTitle" @click="changePlayMode" />
        <SvgIcon className="icon" iconName="icon-prev" title="上一曲" @click="prevMusic" />
        <SvgIcon className="icon" :iconName="(isPlaying === false) ? 'icon-play' : 'icon-pause'"
          :title="(isPlaying === false) ? '播放' : '暂停'" @click="toggleMusicPlay" />
        <SvgIcon className="icon" iconName="icon-next" title="下一曲" @click="nextMusic" />
        <SvgIcon className="icon" iconName="icon-volume" />
      </div>
      <div class="progress">
        <ProgressBar :cTime="cTime" :dTime="dTime" :playedProgressWidth="playedProgressWidth" />
      </div>
    </div>
    <div class="playlist">
      <SvgIcon class="icon" iconName="icon-playlist" />
    </div>
  </div>
  <!-- 沉浸模式 -->
  <div class="immersion" v-show="isImmersion">
    <!-- 左侧空白 -->
    <div class="space"></div>
    <!-- 音乐信息 -->
    <div class="music">
      <img class="music-cover" :src="currentMusicInfo ? getMusicCover(currentMusicInfo.picture) : '/default-cover.jpg'"
        alt="音乐封面">
      <div class="music-info">
        <div class="music-title">{{ currentMusicInfo && currentMusicInfo.title || '标题' }}</div>
        <div class="music-artist">{{ currentMusicInfo && currentMusicInfo.artist || '艺术家' }}</div>
      </div>
      <div class="music-controller">
        <SvgIcon className="icon" :iconName="modeIconName" :title="modeIconTitle" @click="changePlayMode" />
        <SvgIcon className="icon" iconName="icon-prev" title="上一曲" @click="prevMusic"></SvgIcon>
        <SvgIcon className="icon" :iconName="(isPlaying === false) ? 'icon-play' : 'icon-pause'"
          :title="(isPlaying === false) ? '播放' : '暂停'" @click="toggleMusicPlay"></SvgIcon>
        <SvgIcon className="icon" iconName="icon-next" title="下一曲" @click="nextMusic"></SvgIcon>
        <SvgIcon className="icon" iconName="icon-playlist"></SvgIcon>
      </div>
      <div class="progress">
        <ProgressBar :cTime="cTime" :dTime="dTime" :playedProgressWidth="playedProgressWidth" />
      </div>
    </div>
    <!-- 滚动歌词和播放列表 -->
    <div class="lyric-or-playlist">
      <div class="lrc-container" ref="lrcContainerRef">
        <div class="lrc-list" ref="lrcListRef">
          <div v-for="(lrcItem, index) in  lrcLines " :key="index"
            :class="{ 'lrc-word': true, 'active': index === currentIndex }">
            <div>{{ lrcItem.text }}</div>
            <div v-show="isTranslate">{{ lrcItem.extendedLyrics[0] === '//' ? '' : lrcItem.extendedLyrics[0] }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧按钮 -->
    <div class="button">
      <SvgIcon iconName="icon-close" className="icon" @click="closeImmersion" />
      <SvgIcon iconName="icon-play" className="icon" @click="toggleTranslate" />
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
import Lyric from 'lrc-file-parser';
// 引入playerControllerStore中的变量和函数
const playerControllerStore = usePlayerControllerStore();
const { isPlaying, mode, audioElement, currentMusicInfo } = storeToRefs(playerControllerStore);
const { setAudioElement, togglePlay, prev, next, setMode } = playerControllerStore;

// 音乐标签实例
const playerRef = ref(null);
// 组件挂载完后执行
onMounted(() => {
  nextTick(() => {
    // 设置audio元素
    setAudioElement(playerRef.value);
  });
});

/**
 * audio标签事件监听
 */
const handleAudioEnded = () => {
  if (mode.value === 1) {
    // 单曲循环
    audioElement.value.currentTime = 0; // 重新开始播放当前音频
    audioElement.value.play(); // 继续播放
  } else {
    next();
  }
};
const handleAudioCanPlay = () => {
  // 获取音频时长
  dTime.value = audioElement.value.duration;
  if (currentMusicInfo.value) {
    lrc.setLyric(currentMusicInfo.value.lyrics.lyrics);
  }
};
const handleAudioTimeUpdate = () => {
  // 获取音频时长
  const musicTime = audioElement.value.duration;
  // 获取当前播放的时间
  cTime.value = audioElement.value.currentTime;
  // 计算已播放进度条比例宽度
  playedProgressWidth.value = `${(cTime.value / musicTime) * 100}%`;
  // 滚动歌词
  // setOffset();
  lrc.play(cTime.value * 1000);
};
const handleAudioPause = () => {
  lrc.pause();
};
/**
 * 播放控制器
 */

const playMode = ['list-loop', 'one-loop', 'random'];
// 当前播放时间
const cTime = ref();
// 音乐总时长
const dTime = ref();
// 已播放进度条宽度
const playedProgressWidth = ref();
const toggleMusicPlay = () => {
  togglePlay();
};
const prevMusic = () => {
  prev();
};
const nextMusic = () => {
  next();
};
const changePlayMode = () => {
  const newMode = (mode.value + 1) % 3;
  setMode(newMode);
};
const modeIconName = computed(() => {
  return `icon-${playMode[mode.value]}`;
});
const modeIconTitle = computed(() => {
  const playModeTitle = ['列表循环', '单曲循环', '随机播放'];
  return playModeTitle[mode.value];
});

/**
 * 沉浸模式控制
 */

const isImmersion = ref(false);
const openImmersion = () => {
  isImmersion.value = true;
};
const closeImmersion = () => {
  isImmersion.value = false;
};

/**
 * 滚动歌词
 */
const lrcContainerRef = ref(null);
const lrcListRef = ref(null);
const currentIndex = ref(0);
// 歌词列表
const lrcLines = ref([]);
let lrc = new Lyric({
  onPlay: function (line, text) {
    // line：当前播放行的索引，text：当前播放行的歌词
    console.log(line, text);
    currentIndex.value = line;
  },
  onSetLyric: function (lines) {
    // lines：歌词
    console.log(lines);
    lrcLines.value = lines;
  },
  // 偏移时间，默认为0ms
  offset: 150,
  // 播放速度，默认为1
  playbackRate: 1,
  // 是否去除空行：默认为true
  isRemoveBlankLine: true
});
const isTranslate = ref(false);
const toggleTranslate = () => {
  isTranslate.value = !isTranslate.value;
};

// 设置offset
// const setOffset = () => {
//   currentIndex.value = findIndex(formatLyric(currentMusicInfo.value.lyrics.lyrics));
//   // let offset = 0;
//   // const currentLrcElement = lrcListRef.value.children[currentIndex.value];
//   // offset = currentLrcElement.offsetTop - lrcContainerRef.value.clientHeight / 2 + currentLrcElement.clientHeight / 2;
//   // lrcListRef.value.style.transform = `translateY(-${offset}px)`;
// };
</script>
<style scoped lang="less">
/* 播放控制器样式 */
.controller {
  height: 100%;
  width: 100%;
  display: flex;

  .details {
    display: flex;
    align-items: center;
    width: 30%;
    padding: 0 10px;

    .music-cover {
      width: 64px;
      height: 64px;
      border-radius: 10%;
      object-fit: cover;
      box-shadow: var(--el-box-shadow);
    }

    .music-info {
      margin-left: 10px;

      .music-title {
        font-size: 18px;
        font-weight: 800;
      }

      .music-artist {
        font-size: 12px;
        margin: 4px 0 0;
      }
    }
  }

  .btns-progress {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .btns {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 5px 30px;

      .icon {
        width: 24px;
        height: 24px;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }

  .playlist {
    width: 30%;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      width: 24px;
      height: 24px;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
}

/* 沉浸模式样式 */
.immersion {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 9999;
  display: flex;

  /* 左侧空白 */
  .space {
    width: 10%;
  }

  /* 音乐信息 */
  .music {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .music-cover {
      width: 50%;
      border-radius: 10%;
      object-fit: cover;
      box-shadow: var(--el-box-shadow);
      align-self: center;
    }

    .music-info {
      padding: 10px 20px;
      align-self: center;

      .music-title {
        font-size: 20px;
        font-weight: 800;
      }

      .music-artist {
        font-size: 16px;
        margin: 4px 0 0;
      }
    }

    .music-controller {
      display: flex;
      align-items: center;
      justify-content: space-around;

      .icon {
        width: 30px;
        height: 30px;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.2);
        }
      }
    }

    .progress {
      padding: 0 20px;
    }
  }

  /* 滚动歌词和播放列表 */
  .lyric-or-playlist {
    width: 40%;
    // background-color: pink;

    .lrc-container {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;

      .lrc-list {
        padding: 50vh 20px;
        text-align: center;
        transition: 0.3s;

        .lrc-word {
          margin: 10px 0;
          font-size: 16px;
          transition: 0.3s;

          &.active {
            transform: scale(1.5);
            color: greenyellow;
          }
        }
      }
    }
  }

  /* 右侧收起按钮 */
  .button {
    width: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .icon {
      width: 30px;
      height: 30px;
      margin: 60px 0;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>