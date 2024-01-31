<template>
  <div class="song-list-details-container">
    <img src="" alt="" class="cover">
    <div>{{ $route.params.name }}</div>
    <div>
      
    </div>
  </div>
</template>
<script setup>

</script>
<style scoped lang="less">
.song-list-details-container {
  width: 100%;
  height: 100%;
  padding: 20px 20px 0;

  .cover {
    width: 200px;
    height: 200px;
    border-radius: 20px;
  }
}
</style>