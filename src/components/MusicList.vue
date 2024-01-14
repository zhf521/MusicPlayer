<template>
  <el-table :data="props.list" height="100%" style="width: 100%" stripe show-overflow-tooltip>
    <template #empty>
      空空如也~
    </template>
    <el-table-column type="index" />
    <el-table-column label="标题">
      <template #default="scope">
        <div @dblclick="selectPlay(scope.$index)" style="overflow: hidden; text-overflow: ellipsis;">
          <!-- {{ scope.row.tag && scope.row.tag.tags.title || scope.row.basename }} -->
          {{ scope.row.basename }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="艺术家">
      <template #default="scope">
        <!-- {{ scope.row.tag && scope.row.tag.tags.artist || '未知艺术家' }} -->
      </template>
    </el-table-column>
    <el-table-column prop="album" label="专辑">
      <template #default="scope">
        <!-- {{ scope.row.tag && scope.row.tag.tags.album || '未知专辑' }} -->
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerControllerStore } from '../stores/playerController';
import { compareArrays } from '../utils/compareArrays';

// 引入playerControllerStore中的变量和函数
const playerControllerStore = usePlayerControllerStore();
const { currentMusic, playlist } = storeToRefs(playerControllerStore);
const { setPlaylist, setCurrentPlayIndex } = playerControllerStore;

const props = defineProps({ list: Array });
const selectPlay = (index) => {
  // console.log(playlist.value);
  // console.log(props.list);
  // console.log(props.list[index].filename);
  // console.log(currentMusic.value.filename);
  if (props.list[index].filename !== currentMusic.value.filename) {
    // console.log('点击歌曲与当前歌曲不同');
    if (compareArrays(props.list, playlist.value)) {
      // console.log('播放列表相同');
      setCurrentPlayIndex(index);
    } else {
      // console.log('播放列表不相同');
      setPlaylist(props.list);
      setCurrentPlayIndex(index);
    }
  }
};
</script >
<style scoped></style>;