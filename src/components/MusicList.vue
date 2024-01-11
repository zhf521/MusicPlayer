<template>
  <el-table :data="props.list" height="100%" style="width: 100%" stripe show-overflow-tooltip>
    <template #empty>
      空空如也~
    </template>
    <el-table-column type="index" />
    <el-table-column label="标题">
      <template #default="scope">
        <div @dblclick="selectPlay(scope.$index)" style="overflow: hidden; text-overflow: ellipsis;">
          {{ scope.row.tag && scope.row.tag.tags.title || scope.row.basename }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="艺术家">
      <template #default="scope">
        {{ scope.row.tag && scope.row.tag.tags.artist || '未知艺术家' }}
      </template>
    </el-table-column>
    <el-table-column prop="album" label="专辑">
      <template #default="scope">
        {{ scope.row.tag && scope.row.tag.tags.album || '未知专辑' }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerControllerStore } from '../stores/playerController';
import { useUserSettingsStore } from '../stores/userSettings';
import { onMounted } from 'vue';

// props参数
const props = defineProps({
  list: Array
});
// 引入playerControllerStore中的变量和函数
const playerControllerStore = usePlayerControllerStore();
const { currentMusic } = storeToRefs(playerControllerStore);
const { setCurrentPlayIndex, setPlaying } = playerControllerStore;
const selectPlay = (index) => {
  // loadMusic(props.list, index, true);
  if (props.list[index].filename !== currentMusic.value.filename) {
    setCurrentPlayIndex(index);
    setPlaying(true);
  }
};
// 引入userSettingsStore中的变量和函数
const userSettingsStore = useUserSettingsStore();
// const { userSettings } = storeToRefs(userSettingsStore);
const { loadUserSettings } = userSettingsStore;
onMounted(async () => {
  // 加载用户设置
  await loadUserSettings();
});
</script>