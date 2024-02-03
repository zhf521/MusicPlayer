<template>
  <button></button>
</template>
<script setup>
</script>
<style scoped>
button {
  margin-top: 20px;
  font-size: 17px;
  padding: 10px 20px;
  border: transparent;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  background-color: skyblue;
  border-radius: 4px;

  &:hover {
    scale: 1.05;
  }

  &:active {
    scale: 0.95;
  }
}
</style>