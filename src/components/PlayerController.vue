<template>
  <!-- 播放控制器 -->
  <div class="controller">
    <div class="details">
      <img class="cover" src="/default-cover.jpg" alt="音乐封面">
      <div class="info">
        <div class="title">标题</div>
        <div class="artist">艺术家</div>
      </div>
    </div>
    <div class="btns-and-progress">
      <div class="btns">
        <SvgIcon className="icon" iconName="icon-prev" title="上一曲" @click="prevMusic" />
        <SvgIcon className="icon" :iconName="(isPlaying === false) ? 'icon-play' : 'icon-pause'"
          :title="(isPlaying === false) ? '播放' : '暂停'" @click="toggleMusicPlay" />
      </div>
    </div>
    <div class="playlist">
      <SvgIcon class="icon" iconName="icon-playlist" />
    </div>
  </div>
  <div class="immersion" v-if="false">
    沉浸模式
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import SvgIcon from '../components/SvgIcon.vue';
import { usePlayerControllerStore } from '../stores/playerController';
import { nextTick, watch } from 'vue';
// 引入playerControllerStore中的变量和函数
const playerControllerStore = usePlayerControllerStore();
const { isPlaying, audioElement } = storeToRefs(playerControllerStore);
const { setPlaying } = playerControllerStore;

// 切换播放暂停
const toggleMusicPlay = () => {
  setPlaying(!isPlaying.value);
};
watch(isPlaying, (newPlaying) => {
  nextTick(() => {
    newPlaying ? audioElement.value.play() : audioElement.value.pause();
  });
});
// 上一曲
const prevMusic = () => {
  console.log('上一曲');
};
</script>
<style scoped>
.controller {
  height: 100%;
  width: 100%;
  display: flex;

  .details {
    display: flex;
    align-items: center;
    width: 30%;
    padding: 0 10px;

    .cover {
      width: 64px;
      height: 64px;
      border-radius: 10%;
      object-fit: cover;
      box-shadow: var(--el-box-shadow);
    }

    .info {
      margin-left: 10px;

      .title {
        font-size: 18px;
        font-weight: 800;
      }

      .artist {
        font-size: 12px;
        margin: 4px 0 0;
      }
    }
  }

  .btns-and-progress {
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

.immersion {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>