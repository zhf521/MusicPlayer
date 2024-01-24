<template>
  <div class="container">
    <div class="header">
      <Header />
    </div>
    <div class="aside-main">
      <div :class="{ 'aside': true, 'hide': !showAside }">
        <Aside />
      </div>
      <div :class="{ 'main': true, 'hide': !showAside }">
        <router-view></router-view>
      </div>
    </div>
    <div class="footer">
      <Footer />
    </div>
    <div :class="{ 'pure': true, 'show': isPure }">
      <Pure />
    </div>
    <div :class="{ 'playlist': true, 'show': showPlaylist }">
      <Playlist :list="playlist" />
    </div>
  </div>
</template>
<script setup>
import Aside from '../components/Aside.vue';
import Header from '../components/header.vue';
import Footer from '../components/Footer/Footer.vue';
import Pure from '../components/Pure.vue';
import Playlist from '../components/Playlist.vue';
import { useAsideStore } from '../stores/aside';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '../stores/player';
// 引入asideStore中的变量和方法
const asideStore = useAsideStore();
const { showAside } = storeToRefs(asideStore);
// 引入playerStore中的变量
const playerStore = usePlayerStore();
const { isPure, showPlaylist, playlist } = storeToRefs(playerStore);
</script>
<style scoped lang="less">
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    width: 100%;
    height: 60px;
    position: relative;
    z-index: 9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .aside-main {
    display: flex;
    width: 100%;
    height: calc(100% - 165px);

    .aside {
      width: 200px;
      height: 100%;
      transition: width 0.3s ease;

      &.hide {
        width: 64px;
      }
    }

    .main {
      width: calc(100% - 200px);
      height: 100%;
      transition: width 0.3s ease;

      &.hide {
        width: calc(100% - 64px);
      }
    }
  }

  .footer {
    width: 100%;
    height: 105px;
    z-index: 11;
    position: relative;
    box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.2);
    background-color: #fff;
  }

  .pure {
    position: fixed;
    left: 0;
    top: 100vh;
    width: 100vw;
    height: calc(100vh - 105px);
    z-index: 10;
    transition: top 0.3s ease;
    background-color: #fff;

    &.show {
      top: 0;
      transition: top 0.3 ease;
    }
  }

  .playlist {
    position: fixed;
    top: 0;
    left: 100vw;
    width: 450px;
    height: calc(100vh - 105px);
    z-index: 11;
    transition: left 0.3s ease;
    background-color: #fff;

    &.show {
      left: calc(100vw - 450px);
      transition: left 0.3s ease;
    }
  }
}
</style>