<template>
  <el-row :gutter="3" justify="space-evenly" class="player-controller">
    <el-col :span="7">
      <div class="music-details">
        <img class="music-cover" src="" alt="music-cover">
        <div class="music-info">
          <div class="music-title">音乐名</div>
          <div class="music-artist">作者</div>
        </div>
      </div>
    </el-col>
    <el-col :span="7">
      <div class="music-btns">
        <SvgIcon class="icon" iconName="icon-random" />
        <SvgIcon class="icon" iconName="icon-prev" />
        <SvgIcon class="icon" iconName="icon-play" />
        <SvgIcon class="icon" iconName="icon-next" />
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
</template>
<script setup lang="ts">

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