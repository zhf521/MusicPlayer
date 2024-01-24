<template>
  <div class="music-list-container">
    音乐列表
    <div class="list-item" v-for="item in musicList" :key="item.filename">
      <img :src="item.tags ? item.tags.cover : '/defaultCover.png'" alt="音乐封面" class="cover">
      <div class="details">
        <div class="title">{{ item.tags ? item.tags.title : item.basename }}</div>
        <div class="artist">{{ item.tags ? item.tags.artist : '未知艺术家' }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['musicList']);
</script>
<style scoped lang="less">
.music-list-container {
  width: 100%;
  height: 100%;
  // background-color: pink;
  overflow: auto;

  .list-item {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    padding: 5px;
    // background-color: skyblue;
    // border: 1px solid black;

    .cover {
      width: 50px;
      height: 50px;
      border-radius: 10%;
      object-fit: cover;
    }

    .details {
      margin-left: 10px;
    }
  }
}
</style>