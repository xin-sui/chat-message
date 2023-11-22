<template>
  <div class="alert-box" :style="alertStyle">
    <p>{{ props.message }}</p>
    <slot name="description"></slot>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: '#9acc5b'
  },
  backColor: {
    type: String,
    default: '#F8FFF5'
  },
  message: {
    type: String,
    default: 'Success'
  }
})
//提示框样式
const alertStyle = reactive({
  color: props.color,
  backgroundColor: props.backColor
})
</script>

<style lang="scss" scoped>
.alert-box {
  border: none;
  box-sizing: border-box;
  margin: 0;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  word-wrap: break-word;
  height: 3em;
  max-height: 8em;
}
</style>
