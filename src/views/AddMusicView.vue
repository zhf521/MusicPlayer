<template>
  <!-- WebDav未设置 -->
  <div v-if="false" class="not-set">
    <el-empty description="WebDav服务器未配置或配置有误">
      <el-button type="primary" @click="goToSet">点我去设置</el-button>
    </el-empty>
  </div>
  <!-- 文件管理 -->
  <div v-else class="file-manager">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item v-for="(crumb, index) in breadcrumbs" :key="index" :to="getTo(index)">{{ crumb
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 文件内容 -->
    <div class="file-content">
      <el-table v-loading="loading" :data="contents" height="68vh" style="width: 100%" @row-click="handleRowClick"
        @selection-change="handleSelectionChange" ref="fileTableRef">
        <el-table-column type="selection" />
        <el-table-column type="index" />
        <el-table-column label="名称" show-overflow-tooltip>
          <template #default="scope">
            <div style="display:flex; align-items: center;">
              <SvgIcon style="width: 4vh;height: 4vh;"
                :iconName="scope.row.type === 'directory' ? 'icon-folder' : 'icon-music-file'" />
              <span style="flex:1;overflow:hidden;text-overflow: ellipsis;margin-left: 1vw;">{{ scope.row.basename
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="lastmod" label="修改时间" />
        <el-table-column prop="size" label="大小" />
      </el-table>
      <div style="margin-top: 1vh;">
        <el-button type="primary" @click="addToMusicLibrary">添加到音乐库</el-button>
        <el-button @click="clearSelection">清除选择</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useGetDirectory } from '@/hooks/useGetDirectory';
import { computed, onMounted, ref, watch } from 'vue';

// 引入路由和路由器
const route = useRoute();
const router = useRouter();
// 引入UseGetDirectory中的变量和函数
const { contents, getDirectory } = useGetDirectory();
// 加载状态
const loading = ref(false);
// 选择的值
const selectedMusic = ref([]);
// 文件表格的引用
const fileTableRef = ref<InstanceType<typeof ElTable>>()

// 组件挂载完成后执行
onMounted(async () => {
  loading.value = true;
  try {
    if (route.params.filename === '') {
      // 判断是否为根目录
      await getDirectory('/');
    } else {
      await getDirectory(decodeURIComponent(route.params.filename));
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

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
    return { name: 'add-music', params: { filename: '/' } }; // 根目录
  } else {
    const paths = route.params.filename.split('/').slice(0, index + 1).join('/');
    return { name: 'add-music', params: { filename: paths } }; // 点击的路径
  }
}
// 监听路由参数变化
watch(() => route.params.filename, async (newVal) => {
  loading.value = true;
  try {
    await getDirectory(newVal);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});
// 跳转到设置
const goToSet = () => {
  router.push('/setting')
}
// 某一行被单击触发
const handleRowClick = async (row) => {
  if (row.type === 'directory') {
    loading.value = true;
    try {
      await getDirectory(row.filename);
      router.push({ name: 'add-music', params: { filename: row.filename } })
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  } else {
    ElMessage({
      message: '别点啦~没有下一级啦！这么喜欢我就把我加入音乐库吧~',
      type: 'warning',
    })
  }
}
// 触发选择切换
const handleSelectionChange = (val) => {
  selectedMusic.value = val;
}
// 添加到音乐库
const addToMusicLibrary = () => {
  console.log(selectedMusic.value);
}
// 清除选择
const clearSelection = () => {
  fileTableRef.value.clearSelection()
}
</script>
<style scoped>
:deep(.cell) {
  white-space: nowrap;
}
</style>