<template>
  <div class="song-list-details-container">
    <div class="song-list-details">
      <SongListDetails />
    </div>
  </div>
</template>
<script setup>
import SongListDetails from '@/components/SongListDetails.vue';

</script>
<style scoped lang="less">
.song-list-details-container {
  width: 100%;
  height: 100%;
  padding: 20px 20px 0;

  .song-list-info {
    display: flex;

    .cover {
      width: 200px;
      height: 200px;
      border-radius: 20px;
    }
  }

  .song-list {
    width: 100%;
    height: 100%;
    // background-color: pink;
  }
}
</style>