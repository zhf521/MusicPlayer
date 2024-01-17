<template>
  <!-- webDav未设置 -->
  <div v-if="!userSettings.webDavSettings">
    <el-empty description="WebDav服务器未配置或配置有误">
      <el-button type="primary" @click="goToSettings">点我去设置</el-button>
    </el-empty>
  </div>
  <!-- 文件管理 -->
  <div v-else>
    <!-- 面包屑 -->
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item v-for="(crumb, index) in breadcrumbs" :key="index" :to="getTo(index)">{{ crumb
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 文件内容 -->
    <div>
      <el-table v-loading="loading" :data="contents" height="68vh" style="width: 100%" @row-click="handleRowClick"
        @selection-change="handleSelectionChange" ref="fileTableRef" show-overflow-tooltip>
        <el-table-column type="selection" />
        <el-table-column type="index" />
        <el-table-column label="名称">
          <template #default="scope">
            <div style="display:flex; align-items: center;">
              <Component :is="(scope.row.type === 'directory') ? FolderClose : AudioFile" theme="multi-color" size="32"
                :fill="['#333', '#2F88FF', '#FFF', '#43CCF8']" :strokeWidth="3" />
              <span style="flex:1;overflow:hidden;text-overflow: ellipsis;margin-left: 1vw;">{{ scope.row.basename
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="lastmod" label="修改时间" />
        <el-table-column prop="size" label="大小" />
      </el-table>
      <div style="margin-top: 1vh;">
        <el-button type="primary" @click="addMusic">添加到音乐库</el-button>
        <el-button @click="clearSelection">清除选择</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useUserSettingsStore } from '../stores/userSettings';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref, watch } from 'vue';
import { useGetDirectory } from '../hooks/useGetDirectory';
import { ElMessage } from 'element-plus';
import { useMusicLibraryStore } from '../stores/musicLibrary';
import { FolderClose, AudioFile } from '@icon-park/vue-next';

// 引入userSettingsStore中的变量和函数
const userSettingsStore = useUserSettingsStore();
const { userSettings } = storeToRefs(userSettingsStore);
// 引入useGetDirectory中的变量和函数
const { contents, getDirectory } = useGetDirectory();
const loading = ref(false);
const route = useRoute();
onMounted(async () => {
  loading.value = true;
  try {
    await getDirectory(decodeURIComponent(route.params.filename));
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

// 跳转到设置
const router = useRouter();
const goToSettings = () => {
  router.push('/settings');
};

// 计算面包屑导航
const breadcrumbs = computed(() => {
  const paths = route.params.filename.split('/').filter((path) => path !== '');
  if (paths.length === 0) {
    return ['根目录'];
  } else {
    return ['根目录', ...paths.map((path) => decodeURIComponent(path))];
  }
});
// 点击面包屑项时跳转
const getTo = (index) => {
  if (index === 0) {
    return { name: 'cloud-files', params: { filename: '/' } }; // 根目录
  } else {
    const paths = route.params.filename.split('/').slice(0, index + 1).join('/');
    return { name: 'cloud-files', params: { filename: paths } }; // 点击的路径
  }
};
// 监听路由参数变化
watch(() => route.params.filename, async (newVal) => {
  loading.value = true;
  try {
    await getDirectory(newVal);
    // console.log(contents.value);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

// 选择的值
const selectedMusic = ref([]);
// 文件表格的引用
const fileTableRef = ref(null);
// 引入musicLibraryStore中的函数
const musicLibraryStore = useMusicLibraryStore();
const { addToMusicLibrary, saveMusicLibraryToLocal } = musicLibraryStore;

// 某一行被单击触发
const handleRowClick = async (row) => {
  if (row.type === 'directory') {
    loading.value = true;
    try {
      await getDirectory(row.filename);
      router.push({ name: 'cloud-files', params: { filename: row.filename } });
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  } else {
    ElMessage({
      message: '别点啦~没有下一级啦！这么喜欢我就把我加入音乐库吧~',
      type: 'warning',
    });
  }
};
// 触发选择切换
const handleSelectionChange = (val) => {
  selectedMusic.value = val;
};
// 添加到音乐库
const addMusic = async () => {
  addToMusicLibrary(selectedMusic.value);
  await saveMusicLibraryToLocal();
  selectedMusic.value = [];
  fileTableRef.value.clearSelection();
  ElMessage({
    type: 'success',
    message: '添加成功',
  });
  router.push('/music-library');
};
// 清除选择
const clearSelection = () => {
  fileTableRef.value.clearSelection();
};
</script>
<style scoped>
:deep(.cell) {
  white-space: nowrap;
}
</style>