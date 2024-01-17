<template>
  <img class="cover" :src="currentMusicTags && getMusicCover(currentMusicTags.picture) || '/defaultCover.png'" alt="音乐封面">
  <div class="details">
    <div class="title">{{ currentMusicTags && currentMusicTags.title || '欢迎使用！' }}</div>
    <div class="artist">{{ currentMusicTags && currentMusicTags.artist || '嘻嘻嘻' }}</div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '../../stores/player';
import { useMusicLibraryStore } from '../../stores/musicLibrary';
import { computed } from 'vue';
import { getMusicCover } from '../../utils/getMusicCover';

// 引入playerStore中的变量
const playerStore = usePlayerStore();
const { currentPlayMusic } = storeToRefs(playerStore);

// 引入musicLibraryStore中的变量和方法
const musicLibraryStore = useMusicLibraryStore();
const { getMusicTagsByFilename } = musicLibraryStore;

// 当前音乐的标签
const currentMusicTags = computed(() => {
  const musicTags = getMusicTagsByFilename(currentPlayMusic.value);
  return musicTags ? musicTags.tags : {};
});

</script>
<style scoped>
.cover {
  width: 64px;
  height: 64px;
  border-radius: 10%;
  object-fit: cover;
  box-shadow: var(--el-box-shadow);
}

.details {
  margin-left: 10px;

  .title {
    font-size: 18px;
    font-weight: 800;
  }

  .artist {
    font-size: 12px;
    margin-top: 4px;
  }
}
</style>