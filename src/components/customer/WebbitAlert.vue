<template>
  <div v-if="showAlert" class="alert-box" :class="[statusClass]">
    <p>{{ props.message }}</p>
    <slot name="description"></slot>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import { defineProps, computed, nextTick } from 'vue'
const props = defineProps({
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'success'
  },
  showAlert: {
    type: Boolean,
    default: false
  }
})

// 根据类型动态设置类名
const statusClass = computed(() => {
  return {
    'alert-success': props.status === 'success',
    'alert-error ': props.status === 'error'
    // 可根据需要添加更多类型的类名
  }
})

// // 页面渲染之后播放动画
nextTick(() => {
  console.log('==========')
  //   // 使用GSAP添加进入动画到content-title和select-box元素
  gsap.fromTo(
    '.alert-box',
    { opacity: 0, y: -10 },
    {
      duration: 1,
      opacity: 1,
      y: 0
      // onComplete: () => {
      //   //   // 动画完成后，过几秒后消失
      //   gsap.to('.alert-box', {
      //     duration: 1,
      //     opacity: 0,
      //     y: 0,
      //     delay: 2
      //     // onComplete: () => {
      //     //   gsap.set('.alert-box', {
      //     //     opacity: 1
      //     //   })
      //     // }
      //   })
      // }
    }
  )
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

.alert-success {
  color: #9acc5b;
  background-color: #f8fff5;
}

.alert-error {
  color: #ff5b5b;
  background-color: #fff5f5;
}
</style>
