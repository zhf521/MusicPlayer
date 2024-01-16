<template>
  <el-table :data="tableData" height="100%" style="width: 100%" stripe show-overflow-tooltip id="table">
    <template #empty>
      空空如也~
    </template>
    <el-table-column type="index" />
    <el-table-column label="标题">
      <template #default="scope">
        <div @dblclick="selectPlay(scope.$index)" style="overflow: hidden; text-overflow: ellipsis;">
          {{ scope.row.tags && scope.row.tags.tags.title || scope.row.basename }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="艺术家">
      <template #default="scope">
        {{ scope.row.tags && scope.row.tags.tags.artist || '未知艺术家' }}
      </template>
    </el-table-column>
    <el-table-column prop="album" label="专辑">
      <template #default="scope">
        {{ scope.row.tags && scope.row.tags.tags.album || '未知专辑' }}
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '../stores/player';
import { compareArrays } from '../utils/compareArrays';
import { computed, onMounted, ref } from 'vue';

// 引入playerStore中的变量和函数
const playerStore = usePlayerStore();
const { playlist, currentPlayMusic } = storeToRefs(playerStore);
const { play, setPlaylist, setCurrentPlayIndex } = playerStore;

const props = defineProps({ list: { type: Array, default: [] } });
const tableData = ref([]);  // 初始化tableData为空数组
let isFetchingData = false;   // 标记是否正在获取数据

onMounted(() => {
  // 初始化表格数据为前十条数据
  tableData.value = props.list.slice(0, 16);

  let dom = document.getElementById('table');
  let scrollDOM = dom?.querySelector('.el-scrollbar__wrap');

  scrollDOM.onscroll = () => {
    const scrollDistance = scrollDOM.scrollHeight - scrollDOM.scrollTop - scrollDOM.clientHeight;
    if (scrollDistance <= 1 && !isFetchingData) {
      isFetchingData = true;
      // 获取接下来的16条数据
      const startIndex = tableData.value.length;
      const newData = props.list.slice(startIndex, startIndex + 16);
      tableData.value = [...tableData.value, ...newData];
      isFetchingData = false;
    }
  };
});

const musicList = computed(() => {
  // console.log('音乐列表：', props.list.map(item => item.filename));
  return props.list.map(item => item.filename);
});
const selectPlay = (index) => {
  if (compareArrays(musicList.value, playlist.value)) {
    // console.log('播放列表相同');
    if (musicList.value[index] !== currentPlayMusic.value) {
      // console.log('点击的不是当前播放的音乐');
      setCurrentPlayIndex(index);
      play(currentPlayMusic.value);
    } else {
      // console.log('点击的是当前播放的音乐');
      return;
    }
  } else {
    // console.log('播放列表不同');
    setPlaylist(musicList.value);
    setCurrentPlayIndex(index);
    play(currentPlayMusic.value);
  }
};


</script >
<style scoped></style>;