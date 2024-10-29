<template>
   <div ref="hotZone" class="hot-img-container" @click="select(null)">
      <img class="img-canvas" :src="props.url" v-add="addItem" />
      <template v-for="(item, index) in zoneList"  :key="index">
          <Area :item="item" :index="index+1" :class="{'item-active': index === selectIdx}" @click.stop="select(index)" @update="updateItem" @delete="deleteItem" />
      </template>
      <div class="canvas" />
   </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import Area from './Area.vue'
const emit = defineEmits(['update:modelValue', 'select'])
import vAdd from '../directives/add';
const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

const zoneList = computed({
  get() {
    return props.modelValue || [];
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
const selectIdx = ref(null)
const select = (index) => { //选择索引
  selectIdx.value = index
  emit('select', index);
}
const addItem = (item) => {
  zoneList.value.push(item)
}
const updateItem = (item, index) => {
  Object.assign(zoneList.value[index - 1], item)
}
const deleteItem = (index) => {
  zoneList.value.splice(index - 1, 1)
}
</script>