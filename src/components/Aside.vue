<template>
  <div class="aside-container">
    <div :class="{ 'menu-item': true, 'active': item.route === route.path }" v-for="item in menuItems" :key="item.text"
      @click="handleClick(item)">
      <div class="icon">
        <Component :is="item.icon" theme="outline" size="24" />
      </div>
      <div>
        {{ item.text }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { Record as MusicLibraryIcon, CloudStorage as CloudFilesIcon, MusicMenu as SongListIcon, SettingTwo as SettingsIcon } from '@icon-park/vue-next';
import { useRoute, useRouter } from 'vue-router';
// 菜单项
const menuItems = {
  musicLibrary: {
    icon: MusicLibraryIcon,
    text: '音乐库',
    route: '/music-library',
  },
  cloudFiles: {
    icon: CloudFilesIcon,
    text: '云文件',
    route: '/cloud-files/%2F',
  },
  songList: {
    icon: SongListIcon,
    text: '歌单',
    route: '/song-list',
  },
  settings: {
    icon: SettingsIcon,
    text: '设置',
    route: '/settings',
  }
};
// 引入路由器
const router = useRouter();
// 引入路由
const route = useRoute();
// 点击菜单项
const handleClick = (item) => {
  router.push(item.route);
};
</script>
<style scoped>
.aside-container {
  width: 100%;
  height: 100%;
  padding: 5px;

  .menu-item {
    width: 100%;
    height: 50px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    border-radius: 10px;

    .icon {
      margin: 0 10px;
    }

    &.active {
      background-color: skyblue;
    }
  }
}
</style>