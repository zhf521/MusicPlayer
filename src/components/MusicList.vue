<template>
  <el-table :data="tableData" height="100%" style="width: 100%" stripe @cell-dblclick="test">
    <template #empty>
      空空如也~
    </template>
    <el-table-column type="index" />
    <el-table-column label="标题">
      <template #default="scope">
        {{ scope.row.title || scope.row.fileName }}
      </template>
    </el-table-column>
    <el-table-column label="歌手">
      <template #default="scope">
        {{ scope.row.singer || '未知歌手' }}
      </template>
    </el-table-column>
    <el-table-column prop="album" label="专辑">
      <template #default="scope">
        {{ scope.row.album || '未知专辑' }}
      </template>
    </el-table-column>
    <el-table-column prop="duration" label="时长">
      <template #default="scope">
        {{ scope.row.duration || '未知时长' }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
const tableData = [
  //   {
  //     fileName: '11111',
  //     title: '123',
  //     // singer: '哈哈哈哈',
  //     album: '你好',
  //     duration: '123',
  //   },
  //   {
  //     fileName: '11111',
  //     title: '测试',
  //     singer: '哈哈哈哈',
  //     album: '你好',
  //     // duration: '123',
  //   }, {
  //     fileName: '11111',
  //     // title: '测试',
  //     singer: '哈哈哈哈',
  //     album: '你好',
  //     duration: '123',
  //   }, {
  //     title: '测试',
  //     singer: '哈哈哈哈',
  //     album: '你好',
  //     duration: '123',
  //   }, {
  //     title: '测试',
  //     singer: '哈哈哈哈',
  //     album: '你好',
  //     duration: '123',
  //   }, {
  //     title: '测试',
  //     singer: '哈哈哈哈',
  //     album: '你好',
  //     duration: '123',
  //   }, {
  //     title: '测试',
  //     singer: '哈哈哈哈',
  //     album: '你好',
  //     duration: '123',
  //   }, {
  //     title: '测试',
  //     singer: '哈哈哈哈',
  //     album: '你好',
  //     duration: '123',
  //   }, {
  //     title: '测试',
  //     singer: '哈哈哈哈',
  //     album: '你好',
  //     duration: '123',
  //   }, {
  //     title: '测试',
  //     singer: '哈哈哈哈',
  //     album: '你好',
  //     duration: '123',
  //   }, {
  //     title: '测试',
  //     singer: '哈哈哈哈',
  //     album: '你好',
  //     duration: '123',
  //   }, {
  //     title: '测试',
  //     singer: '哈哈哈哈',
  //     album: '你好',
  //     duration: '123',
  //   }, {
  //     title: '测试',
  //     singer: '哈哈哈哈',
  //     album: '你好',
  //     duration: '123',
  //   }, {
  //     title: '测试',
  //     singer: '哈哈哈哈',
  //     album: '你好',
  //     duration: '123',
  //   }, {
  //     title: '测试',
  //     singer: '哈哈哈哈',
  //     album: '你好',
  //     duration: '123',
  //   }, {
  //     title: '测试',
  //     singer: '哈哈哈哈',
  //     album: '你好',
  //     duration: '123',
  //   },
];
const test = (row, column, cell, event) => {
  console.log(row, column, cell, event);
}
</script>