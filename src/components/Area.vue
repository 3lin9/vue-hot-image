<template>
   <div class="hot-area"
    v-move="onMove"
    :data-index ="index"
    :style="{
        left: item.x + 'px',
        top: item.y + 'px',
        width: item.width + 'px',
        height: item.height + 'px'
      }">
      <div class="delete" @click.stop="onDelteItem()"></div>
      <span class="link-text">链接{{index}}</span>
      <ul v-resize="onResize">
        <li class="tl" />
        <li class="tc" />
        <li class="tr" />
        <li class="ml" />
        <li class="mr" />
        <li class="bl" />
        <li class="bc" />
        <li class="br" />
      </ul>
   </div>
</template>
<script setup>
import vMove from '../directives/move';
import vResize from '../directives/resize';
const emit = defineEmits([ 'update','delete'])
const props = defineProps({
  item: {},
  index: Number
})
const onMove = (position) => {
  console.log("元素的新位置：", position);
  emit('update', position, props.index)
};
const onResize = (position) => {
  emit('update', position, props.index)
};
const onDelteItem = (index) => {
  emit('delete', props.index)
}
</script>