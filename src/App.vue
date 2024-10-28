<script setup>
import { ref } from 'vue';
import HotZone from './components/HotZone.vue';
const  a = ref([])
</script>

<template>
  <div style="width: 500px;height: 800px; overflow-y:auto;">
      <hot-zone v-model="a" :url="'https://cssassetsuat.chowsangsang.com.cn/cms/upload/css/241017/f/67106f8a44ddf.jpg'" />
  </div>
  
</template>

<style scoped>
</style>
