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
import { usePlayerControllerStore } from '../stores/playerController';
import { compareArrays } from '../utils/compareArrays';
import { onMounted, ref } from 'vue';

// 引入playerControllerStore中的变量和函数
const playerControllerStore = usePlayerControllerStore();
const { currentMusic, playlist } = storeToRefs(playerControllerStore);
const { setPlaylist, setCurrentPlayIndex } = playerControllerStore;

const props = defineProps({ list: Array });
const tableData = ref([]);  // 初始化tableData为空数组
const startIndex = ref(0);  // 记录已加载数据的起始索引
let isFetchingData = false;   // 标记是否正在获取数据

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
</script >
<style scoped></style>;