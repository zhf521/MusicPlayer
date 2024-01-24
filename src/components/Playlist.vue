<template>
  <el-table :data="tableData" height="100%" style="width: 100%" stripe show-overflow-tooltip id="table"
    :row-class-name="tableRowClassName">
    <template #empty>
      空空如也~
    </template>
    <el-table-column type="index" />
    <el-table-column label="标题">
      <template #default="scope">
        <div @dblclick="selectPlay(scope.$index)" style="overflow: hidden; text-overflow: ellipsis;">
          {{ getMusicTagsByFilename(scope.row) && (getMusicTagsByFilename(scope.row)).title || '未知标题' }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '../stores/player';
import { computed, onMounted, ref } from 'vue';
import { useMusicLibraryStore } from '../stores/musicLibrary';

// 引入playerStore中的变量和函数
const playerStore = usePlayerStore();
const { playlist, currentPlayMusic, currentPlayIndex } = storeToRefs(playerStore);
const { loadMusic, play, setPlaylist, setCurrentPlayIndex, } = playerStore;
// 引入musicLibraryStore中的变量和方法
const musicLibraryStore = useMusicLibraryStore();
const { getMusicTagsByFilename } = musicLibraryStore;
const props = defineProps({ list: { type: Array, default: [] } });
const tableData = ref([]);  // 初始化tableData为空数组
let isFetchingData = false;   // 标记是否正在获取数据

onMounted(() => {
  // 初始化表格数据为前十条数据
  tableData.value = props.list.slice(0, 18);

  let dom = document.getElementById('table');
  let scrollDOM = dom?.querySelector('.el-scrollbar__wrap');

  scrollDOM.onscroll = () => {
    const scrollDistance = scrollDOM.scrollHeight - scrollDOM.scrollTop - scrollDOM.clientHeight;
    if (scrollDistance <= 1 && !isFetchingData) {
      isFetchingData = true;
      // 获取接下来的18条数据
      const startIndex = tableData.value.length;
      const newData = props.list.slice(startIndex, startIndex + 18);
      tableData.value = [...tableData.value, ...newData];
      isFetchingData = false;
    }
  };
});

const musicList = computed(() => {
  // console.log('音乐列表：', props.list.map(item => item.filename));
  return props.list.map(item => item.filename);
});
const selectPlay = async (index) => {
  if (musicList.value[index] !== currentPlayMusic.value) {
    // console.log('点击的不是当前播放的音乐');
    setCurrentPlayIndex(index);
    await loadMusic(currentPlayMusic.value);
    play();
  } else {
    // console.log('点击的是当前播放的音乐');
    return;
  }
};
const tableRowClassName = ({
  row,
  rowIndex,
}) => {
  if (rowIndex === currentPlayIndex.value) {
    return 'success-row';
  }
};
</script >
<style scoped lang="less">
.el-table .success-row {
  --el-table-tr-bg-color: skyblue;
}
</style>